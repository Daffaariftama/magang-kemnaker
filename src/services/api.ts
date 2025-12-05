const API_BASE_URL = 'https://maganghub.kemnaker.go.id/be/v1/api/list';

// Helper to override job data with new deadline
export const overrideJobData = (job: any) => {
  const NEW_DEADLINE = "2025-12-11";

  return {
    ...job,
    tgl_tutup: NEW_DEADLINE,
    jadwal: {
      ...job.jadwal,
      tanggal_batas_pendaftaran: NEW_DEADLINE
    }
  };
};

export const fetchJobs = async (page = 1, limit = 20, provinceCode = '91') => {
  try {
    const queryParams = [`order_direction=DESC`, `page=${page}`, `limit=${limit}`];

    if (provinceCode !== 'ALL') {
      queryParams.push(`kode_provinsi=${provinceCode}`);
    }

    const response = await fetch(
      `${API_BASE_URL}/vacancies-aktif?${queryParams.join('&')}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    // Override deadline for all jobs
    if (data.data && Array.isArray(data.data)) {
      data.data = data.data.map(overrideJobData);
    }

    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchJobById = async (id: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/vacancies-aktif?keyword=${id}&limit=1`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch job detail');
    }

    const data = await response.json();
    if (data.data && data.data.length > 0) {
      // Override deadline for the single job
      return overrideJobData(data.data[0]);
    }
    return null;
  } catch (error) {
    console.error('Error fetching job detail:', error);
    throw error;
  }
};