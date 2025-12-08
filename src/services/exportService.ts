import ExportWorker from '../workers/export.worker?worker';

const DB_NAME = 'MagangHubExportDB';
const DB_VERSION = 1;
const STORE_EXPORTS = 'exports';
const STORE_JOBS = 'jobs_export';

export class ExportService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Store untuk history export
        if (!db.objectStoreNames.contains(STORE_EXPORTS)) {
          const exportsStore = db.createObjectStore(STORE_EXPORTS, { keyPath: 'id', autoIncrement: true });
          exportsStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Store untuk cache jobs (untuk export cepat)
        if (!db.objectStoreNames.contains(STORE_JOBS)) {
          const jobsStore = db.createObjectStore(STORE_JOBS, { keyPath: 'id_posisi' });
          jobsStore.createIndex('provinsi', 'provinsi', { unique: false });
          jobsStore.createIndex('last_updated', 'last_updated', { unique: false });
        }
      };
    });
  }

  // Simpan data jobs untuk export cepat
  async saveJobsForExport(provinceCode: string, jobs: any[]): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_JOBS], 'readwrite');
      const store = transaction.objectStore(STORE_JOBS);

      // Hapus jobs lama untuk provinsi ini
      const clearRequest = store.index('provinsi').openCursor(IDBKeyRange.only(provinceCode));

      clearRequest.onsuccess = () => {
        const cursor = clearRequest.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          // Simpan jobs baru
          const timestamp = Date.now();
          jobs.forEach(job => {
            store.put({
              ...job,
              provinsi: provinceCode,
              last_updated: timestamp
            });
          });
        }
      };

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Ambil semua jobs untuk export
  async getAllJobsForExport(): Promise<any[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_JOBS], 'readonly');
      const store = transaction.objectStore(STORE_JOBS);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Simpan history export
  async saveExportHistory(exportData: any): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_EXPORTS], 'readwrite');
      const store = transaction.objectStore(STORE_EXPORTS);

      const historyRecord = {
        ...exportData,
        timestamp: Date.now(),
        date: new Date().toISOString()
      };

      store.add(historyRecord);

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Ambil history export terakhir
  async getLastExportHistory(): Promise<any> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_EXPORTS], 'readonly');
      const store = transaction.objectStore(STORE_EXPORTS);
      const index = store.index('timestamp');
      const request = index.openCursor(null, 'prev'); // Ambil yang terbaru

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          resolve(cursor.value);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  // Download Excel
  downloadExcel(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Export utama via Worker
  async exportAllJobsToExcel(jobs: any[], customFilename?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const worker = new ExportWorker();

      worker.onmessage = async (e) => {
        const { type, data, error } = e.data;

        if (type === 'SUCCESS') {
          try {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const timestamp = new Date().toISOString().split('T')[0];
            const filename = customFilename || `lowongan-magang-${timestamp}.xlsx`;

            this.downloadExcel(blob, filename);

            // Simpan history
            await this.saveExportHistory({
              totalJobs: jobs.length,
              filename: filename,
              timestamp: Date.now()
            });

            resolve();
          } catch (err) {
            console.error('Error handling worker response:', err);
            reject(err);
          } finally {
            worker.terminate();
          }
        } else if (type === 'ERROR') {
          console.error('Worker error:', error);
          reject(new Error(error));
          worker.terminate();
        }
      };

      worker.onerror = (err) => {
        console.error('Worker infrastructure error:', err);
        reject(err);
        worker.terminate();
      };

      // Start the export process
      worker.postMessage({ type: 'EXPORT', data: jobs });
    });
  }

  // Get database size
  async getDatabaseSize(): Promise<number> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_JOBS, STORE_EXPORTS], 'readonly');
      let totalSize = 0;

      const jobsStore = transaction.objectStore(STORE_JOBS);
      const jobsRequest = jobsStore.getAll();

      jobsRequest.onsuccess = () => {
        const jobs = jobsRequest.result;
        totalSize += new Blob([JSON.stringify(jobs)]).size;

        const exportsStore = transaction.objectStore(STORE_EXPORTS);
        const exportsRequest = exportsStore.getAll();

        exportsRequest.onsuccess = () => {
          const exports = exportsRequest.result;
          totalSize += new Blob([JSON.stringify(exports)]).size;
          resolve(totalSize);
        };
      };

      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Method untuk mendapatkan link lowongan individual
  getJobLink(jobId: string | number): string {
    return `https://maganghub.kemnaker.go.id/lowongan/view/${jobId}`;
  }
}

export const exportService = new ExportService();