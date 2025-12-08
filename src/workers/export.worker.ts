import { utils, write } from 'xlsx';

// Define the shape of the data expected by the worker
interface WorkerMessage {
  type: 'EXPORT';
  data: any[];
}

// Helper function to format jobs (moved from exportService.ts)
const formatJobsForExcel = (jobs: any[]): any[] => {
  return jobs.map(job => {
    // Parse program studi
    let programStudi = '';
    try {
      const psList = JSON.parse(job.program_studi || '[]');
      programStudi = psList.map((ps: any) => ps.title).join(', ');
    } catch {
      programStudi = job.program_studi || '';
    }

    // Parse jenjang
    let jenjang = '';
    try {
      const jList = JSON.parse(job.jenjang || '[]');
      jenjang = jList.join(', ');
    } catch {
      jenjang = job.jenjang || '';
    }

    // Calculate Durasi Magang
    let durasi = '';
    if (job.jadwal?.tanggal_mulai && job.jadwal?.tanggal_selesai) {
      const start = new Date(job.jadwal.tanggal_mulai);
      const end = new Date(job.jadwal.tanggal_selesai);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      durasi = `${diffMonths} Bulan`;
    }

    // Calculate Sisa Hari
    let sisaHari = '';
    if (job.jadwal?.tanggal_batas_pendaftaran) {
      const batas = new Date(job.jadwal.tanggal_batas_pendaftaran);
      const now = new Date();
      const diffTime = batas.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      sisaHari = diffDays > 0 ? `${diffDays} Hari` : 'Ditutup';
    }

    // Generate link lowongan
    const jobLink = `https://maganghub.kemnaker.go.id/lowongan/view/${job.id_posisi}`;

    return {
      'ID Posisi': job.id_posisi,
      'Posisi': job.posisi,
      'Perusahaan': job.perusahaan.nama_perusahaan,
      'Alamat Perusahaan': job.perusahaan.alamat,
      'Kota/Kabupaten': job.perusahaan.nama_kabupaten,
      'Provinsi': job.perusahaan.nama_provinsi,
      'Program Studi': programStudi,
      'Jenjang Pendidikan': jenjang,
      'Kuota': job.jumlah_kuota,
      'Terdaftar': job.jumlah_terdaftar,
      'Status': job.ref_status_posisi.nama_status_posisi,
      'Tanggal Mulai': job.jadwal.tanggal_mulai ? new Date(job.jadwal.tanggal_mulai).toLocaleDateString('id-ID') : '',
      'Tanggal Selesai': job.jadwal.tanggal_selesai ? new Date(job.jadwal.tanggal_selesai).toLocaleDateString('id-ID') : '',
      'Batas Pendaftaran': job.jadwal.tanggal_batas_pendaftaran ? new Date(job.jadwal.tanggal_batas_pendaftaran).toLocaleDateString('id-ID') : '',
      'Durasi Magang': durasi,
      'Sisa Hari': sisaHari,
      'Deskripsi Pekerjaan': job.deskripsi_posisi || '',
      'Link Lowongan': jobLink
    };
  });
};

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  if (e.data.type === 'EXPORT') {
    try {
      const jobs = e.data.data;
      const formattedJobs = formatJobsForExcel(jobs);

      const worksheet = utils.json_to_sheet(formattedJobs);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, 'Lowongan Magang');

      // Set column widths
      const colWidths = [
        { wch: 20 }, // ID Posisi
        { wch: 30 }, // Posisi
        { wch: 30 }, // Perusahaan
        { wch: 40 }, // Alamat
        { wch: 20 }, // Kota
        { wch: 15 }, // Provinsi
        { wch: 30 }, // Program Studi
        { wch: 20 }, // Jenjang
        { wch: 8 },  // Kuota
        { wch: 10 }, // Terdaftar
        { wch: 15 }, // Status
        { wch: 12 }, // Mulai
        { wch: 12 }, // Selesai
        { wch: 15 }, // Batas Daftar
        { wch: 12 }, // Durasi
        { wch: 10 }, // Sisa Hari
        { wch: 50 }, // Deskripsi
        { wch: 60 }  // Link Lowongan
      ];
      worksheet['!cols'] = colWidths;

      // Add hyperlinks
      const linkColIndex = 17; // Link Lowongan column index
      const range = utils.decode_range(worksheet['!ref'] || 'A1');
      for (let row = range.s.r + 1; row <= range.e.r; row++) {
        const linkCell = utils.encode_cell({ r: row, c: linkColIndex });
        if (worksheet[linkCell]) {
          worksheet[linkCell].l = { Target: worksheet[linkCell].v as string };
          worksheet[linkCell].s = {
            font: { color: { rgb: '0563C1' }, underline: true },
            fill: { fgColor: { rgb: 'FFFFFF' } }
          };
        }
      }

      const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
      // We cannot send a Blob directly from a worker in all environments easily or it might be needed to send array buffer
      // But passing the array buffer back is efficient.
      self.postMessage({ type: 'SUCCESS', data: excelBuffer }, [excelBuffer.buffer] as any);

    } catch (error) {
      self.postMessage({ type: 'ERROR', error: String(error) });
    }
  }
};
