import LZString from 'lz-string';

const DB_NAME = 'MagangHubCache';
const DB_VERSION = 2; // Bump version to force schema update
const STORE_NAME = 'provinceData';
export const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

interface CachedProvinceData {
  provinceCode: string;
  data: string; // Compressed string
  timestamp: number;
  totalPages: number;
}

class IndexedDBService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (this.db) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        console.error('IndexedDB error:', event);
        reject('Error opening database');
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'provinceCode' });
        } else {
          // If we want to be safe on schema change (any[] -> string):
          // Clearing the store is a good idea to avoid type mismatches when reading old data.
          const transaction = (event.target as IDBOpenDBRequest).transaction;
          if (transaction) {
            const store = transaction.objectStore(STORE_NAME);
            store.clear();
            console.log("Storage cleared for upgrade to compressed format.");
          }
        }
      };
    });
  }

  async saveProvinceData(
    provinceCode: string,
    data: any[],
    totalPages: number
  ): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('Database not initialized');

      try {
        const compressedData = LZString.compressToUTF16(JSON.stringify(data));

        const transaction = this.db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const cacheEntry: CachedProvinceData = {
          provinceCode,
          data: compressedData,
          timestamp: Date.now(),
          totalPages,
        };

        const request = store.put(cacheEntry);

        request.onsuccess = () => resolve();
        request.onerror = () => reject('Error saving to cache');
      } catch (err) {
        console.error("Compression error:", err);
        reject('Error compressing or saving data');
      }
    });
  }

  async getProvinceData(
    provinceCode: string
  ): Promise<{
    data: any[] | null;
    isFresh: boolean;
    timestamp: number | null;
    totalPages: number | null;
  }> {
    await this.init();
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('Database not initialized');

      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(provinceCode);

      request.onsuccess = () => {
        const result = request.result as CachedProvinceData;
        if (!result) {
          resolve({
            data: null,
            isFresh: false,
            timestamp: null,
            totalPages: null,
          });
          return;
        }

        try {
          // Decompress
          const decompressed = result.data ? JSON.parse(LZString.decompressFromUTF16(result.data)) : [];
          const isFresh = Date.now() - result.timestamp < CACHE_DURATION_MS;

          resolve({
            data: decompressed,
            isFresh,
            timestamp: result.timestamp,
            totalPages: result.totalPages,
          });
        } catch (e) {
          console.error("Decompression error:", e);
          // Treat corrupted/incompatible data as cache miss
          resolve({
            data: null,
            isFresh: false,
            timestamp: null,
            totalPages: null,
          });
        }
      };

      request.onerror = () => reject('Error reading from cache');
    });
  }

  async clearCache(): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('Database not initialized');

      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject('Error clearing cache');
    });
  }
}

export const indexedDBService = new IndexedDBService();
