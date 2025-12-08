import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx'; // Using xlsx to parse CSV robustly

// Interfaces matching src/hooks/useJobs.ts
interface ProgramStudi {
  value: string;
  title: string;
}

interface Job {
  id_posisi: string;
  posisi: string;
  deskripsi_posisi: string;
  program_studi: string; // Serialized JSON array of ProgramStudi
  jenjang: string; // Serialized JSON array of strings
  id_status_posisi: number;
  jumlah_kuota: number;
  jumlah_terdaftar: number;
  perusahaan: {
    id_perusahaan: string;
    nama_perusahaan: string;
    alamat: string;
    logo: string | null;
    nama_kabupaten: string;
    nama_provinsi: string;
  };
  jadwal: {
    tanggal_mulai: string;
    tanggal_selesai: string;
    tanggal_batas_pendaftaran: string;
  };
  ref_status_posisi: {
    id_status_posisi: number;
    nama_status_posisi: string;
  };
}

const inputPath = path.join(process.cwd(), 'Lowongan_Magang_Semua_Provinsi_2025-12-07.csv');
const outputPath = path.join(process.cwd(), 'public', 'data', 'jobs.json');

// UUID-like generator for company ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Helper to safely get string
const safeString = (val: any): string => {
  if (val === null || val === undefined) return "";
  return String(val);
};

function parseDate(raw: any): string {
  const dateStr = safeString(raw);
  if (!dateStr) return "";
  // If it's already YYYY-MM-DD
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr;

  // Attempt parse DD/MM/YYYY
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
}

function processProgramStudi(raw: any): string {
  const str = safeString(raw);
  if (!str) return "[]";
  // Split by comma, trim
  const items = str.split(',').map(s => s.trim()).filter(Boolean);
  const objects = items.map(item => ({ title: item, value: item }));
  return JSON.stringify(objects);
}

function processJenjang(raw: any): string {
  const str = safeString(raw);
  if (!str) return "[]";
  const items = str.split(',').map(s => s.trim()).filter(Boolean);
  return JSON.stringify(items);
}

async function convert() {
  console.log(`📂 Reading CSV from: ${inputPath}`);

  if (!fs.existsSync(inputPath)) {
    console.error("❌ Input file not found!");
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(inputPath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json<any>(sheet);

  console.log(`📊 Found ${rawData.length} rows`);

  const jobs: Job[] = rawData.map(row => {
    // Map fields
    // CSV Headers: ID Posisi,Posisi,Perusahaan,Alamat Perusahaan,Kota/Kabupaten,Provinsi,Program Studi,Jenjang Pendidikan,Kuota,Terdaftar,Status,Tanggal Mulai,Tanggal Selesai,Batas Pendaftaran,Deskripsi Pekerjaan,Link Lowongan

    const job: Job = {
      id_posisi: row['ID Posisi'] || generateId(),
      posisi: row['Posisi'] || "Lowongan Magang",
      deskripsi_posisi: row['Deskripsi Pekerjaan'] || "",
      program_studi: processProgramStudi(row['Program Studi']),
      jenjang: processJenjang(row['Jenjang Pendidikan']),
      id_status_posisi: 1, // Assumption
      jumlah_kuota: parseInt(row['Kuota']) || 0,
      jumlah_terdaftar: parseInt(row['Terdaftar']) || 0,
      perusahaan: {
        id_perusahaan: generateId(), // Dummy ID
        nama_perusahaan: row['Perusahaan'] || "Unknown Company",
        alamat: row['Alamat Perusahaan'] || "",
        logo: null,
        nama_kabupaten: row['Kota/Kabupaten'] || "",
        nama_provinsi: row['Provinsi'] || ""
      },
      jadwal: {
        tanggal_mulai: parseDate(row['Tanggal Mulai']),
        tanggal_selesai: parseDate(row['Tanggal Selesai']),
        tanggal_batas_pendaftaran: parseDate(row['Batas Pendaftaran'])
      },
      ref_status_posisi: {
        id_status_posisi: 1,
        nama_status_posisi: row['Status'] || "Terverifikasi"
      }
    };
    return job;
  });

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Minify JSON (default behavior of stringify without space arg)
  fs.writeFileSync(outputPath, JSON.stringify(jobs));

  console.log(`✅ Successfully converted ${jobs.length} jobs to JSON.`);
  console.log(`💾 Saved to: ${outputPath}`);

  // Check size
  const stats = fs.statSync(outputPath);
  console.log(`📦 File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
}

convert();
