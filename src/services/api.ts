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

// NEW: Fetch specific job detail by ID from read endpoint
export const fetchJobDetailById = async (id: string) => {
  try {
    const response = await fetch(
      `https://maganghub.kemnaker.go.id/be/v1/api/read/vacancies-aktif/${id}?order_direction=ASC&page=1&limit=10&per_page=10`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch specific job detail');
    }

    const data = await response.json();

    // The structure might be data.data (array) or just data.data (object) or similar.
    // Based on typical pagination params in URL, it might return a list or singular wrapped in data.
    // We will handle both cases defensively.

    if (data.data) {
      // If it's an array (due to pagination params), take the first one
      if (Array.isArray(data.data)) {
        return data.data.length > 0 ? overrideJobData(data.data[0]) : null;
      }
      // If it's a single object
      return overrideJobData(data.data);
    }

    return null;
  } catch (error) {
    console.error('Error fetching specific job detail:', error);
    throw error;
  }
};