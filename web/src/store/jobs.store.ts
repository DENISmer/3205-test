import { create } from 'zustand';
import type { JobsState } from '../types/job.types';
import { cancelJob, createJob, getJob, getJobs } from '../api/jobs.api';

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  activeJob: null,
  activeJobId: null,
  loading: false,
  error: null,

  submitUrls: async (urls) => {
    set({ loading: true, error: null });
    try {
      const { jobId } = await createJob(urls);
      await get().refreshList();
      await get().selectJob(jobId);
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      set({ loading: false });
    }
  },

  refreshList: async () => {
    try {
      const jobs = await getJobs();
      set({ jobs });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Unknown error' });
    }
  },

  selectJob: async (id) => {
    set({ activeJobId: id, activeJob: null });
    try {
      const job = await getJob(id);
      if (get().activeJobId !== id) return;
      set({ activeJob: job });
    } catch (err) {
      if (get().activeJobId !== id) return;
      set({ error: err instanceof Error ? err.message : 'Unknown error' });
    }
  },

  cancelActiveJob: async () => {
    const id = get().activeJobId;
    if (!id) return;
    try {
      const job = await cancelJob(id);
      if (get().activeJobId !== id) return;
      set({ activeJob: job });
      await get().refreshList();
    } catch (err) {
      if (get().activeJobId !== id) return;
      set({ error: err instanceof Error ? err.message : 'Unknown error' });
    }
  },
}));
