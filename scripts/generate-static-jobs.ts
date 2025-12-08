import fs from 'fs';
import path from 'path';

const API_BASE_URL = 'https://maganghub.kemnaker.go.id/be/v1/api/list';
const NEW_DEADLINE = "2025-12-07";

// Helper to override job data
const overrideJobData = (job: any) => {
  return {
    ...job,
    tgl_tutup: NEW_DEADLINE,
    jadwal: {
      ...job.jadwal,
      tanggal_batas_pendaftaran: NEW_DEADLINE
    }
  };
};

async function fetchAllJobs() {
  console.log('🚀 Starting job data snapshot...');

  const allJobs: any[] = [];
  let page = 1;
  const limit = 20;
  let hasMore = true;

  while (hasMore) {
    try {
      console.log(`Fetching page ${page}...`);
      const url = `${API_BASE_URL}/vacancies-aktif?order_direction=DESC&page=${page}&limit=${limit}&kode_provinsi=31`;
      console.log(`URL: ${url}`);

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://maganghub.kemnaker.go.id/',
          'Origin': 'https://maganghub.kemnaker.go.id'
        }
      });

      console.log(`Status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch page ${page}: ${response.statusText}`);
      }

      const text = await response.text();
      console.log('Raw response preview:', text.slice(0, 500));

      let data;
      try {
        data = JSON.parse(text);
        console.log('Parsed data keys:', Object.keys(data));
        if (data.data) {
          console.log('Data.data type:', typeof data.data, Array.isArray(data.data));
          console.log('Data.data length:', data.data.length);
        }
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        throw new Error('Invalid JSON response');
      }

      const jobs = data.data || [];

      if (jobs.length === 0) {
        hasMore = false;
        console.log('No more jobs found.');
      } else {
        const processedJobs = jobs.map(overrideJobData);
        allJobs.push(...processedJobs);
        console.log(`Loaded ${jobs.length} jobs. Total: ${allJobs.length}`);

        // If we got fewer jobs than limit, we're likely done
        if (jobs.length < limit) {
          hasMore = false;
        } else {
          page++;
        }
      }

      // Respectful delay
      await new Promise(resolve => setTimeout(resolve, 200));

    } catch (error) {
      console.error('Error fetching jobs:', error);
      hasMore = false;
    }
  }

  return allJobs;
}

async function saveJobs() {
  const jobs = await fetchAllJobs();

  const outputDir = path.join(process.cwd(), 'public', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'jobs.json');
  fs.writeFileSync(outputPath, JSON.stringify(jobs, null, 2));

  console.log(`✅ Successfully saved ${jobs.length} jobs to ${outputPath}`);
}

saveJobs();
