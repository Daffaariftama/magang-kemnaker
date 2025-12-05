import { useJobsContext } from '../contexts/JobsContext';



export interface ProgramStudi {
  value: string;
  title: string;
}

export interface Perusahaan {
  id_perusahaan: string;
  nama_perusahaan: string;
  alamat: string;
  logo: string | null;
  nama_kabupaten: string;
  nama_provinsi: string;
}

export interface Jadwal {
  tanggal_mulai: string;
  tanggal_selesai: string;
  tanggal_batas_pendaftaran: string;
}

export interface StatusPosisi {
  id_status_posisi: number;
  nama_status_posisi: string;
}

export interface Job {
  id_posisi: string;
  posisi: string;
  deskripsi_posisi: string;
  program_studi: string;
  jenjang: string;
  id_status_posisi: number;
  jumlah_kuota: number;
  jumlah_terdaftar: number;
  perusahaan: Perusahaan;
  jadwal: Jadwal;
  ref_status_posisi: StatusPosisi;
}

export const useJobs = () => {
  return useJobsContext();
};