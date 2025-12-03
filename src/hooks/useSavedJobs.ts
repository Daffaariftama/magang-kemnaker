import { useState, useEffect } from 'react';

export type SaveStatus = 'success' | 'already_saved' | 'quota_full' | 'error';

export const useSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<any[]>([]);

  const loadJobs = () => {
    try {
      const jobs = JSON.parse(localStorage.getItem('magang_savedJobs') || '[]');
      setSavedJobs(jobs);
    } catch (e) {
      console.error('Error loading saved jobs:', e);
      setSavedJobs([]);
    }
  };

  useEffect(() => {
    loadJobs();

    // Listen for storage events (in case updated from another tab/component)
    const handleStorageChange = () => loadJobs();
    window.addEventListener('savedJobsUpdated', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('savedJobsUpdated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const saveJob = (job: any): SaveStatus => {
    try {
      const currentJobs = JSON.parse(localStorage.getItem('magang_savedJobs') || '[]');

      if (currentJobs.some((j: any) => j.id_posisi === job.id_posisi)) {
        return 'already_saved';
      }

      if (currentJobs.length >= 10) {
        return 'quota_full';
      }

      const newJobs = [job, ...currentJobs];
      localStorage.setItem('magang_savedJobs', JSON.stringify(newJobs));
      setSavedJobs(newJobs);
      window.dispatchEvent(new Event('savedJobsUpdated'));
      return 'success';
    } catch (e) {
      console.error('Error saving job:', e);
      return 'error';
    }
  };

  const removeJob = (id: string): boolean => {
    try {
      const currentJobs = JSON.parse(localStorage.getItem('magang_savedJobs') || '[]');
      const newJobs = currentJobs.filter((j: any) => j.id_posisi !== id);
      localStorage.setItem('magang_savedJobs', JSON.stringify(newJobs));
      setSavedJobs(newJobs);
      window.dispatchEvent(new Event('savedJobsUpdated'));
      return true;
    } catch (e) {
      console.error('Error removing job:', e);
      return false;
    }
  };

  const isJobSaved = (id: string) => {
    return savedJobs.some((j) => j.id_posisi === id);
  };

  return { savedJobs, saveJob, removeJob, isJobSaved };
};
