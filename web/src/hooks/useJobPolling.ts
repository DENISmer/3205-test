import { useEffect } from 'react';
import { useJobsStore } from '../store/jobs.store';

const POLL_INTERVAL_MS = 1500;
const FINAL_STATUSES = ['completed', 'cancelled', 'failed'];

export function useJobPolling(jobId: string | null) {
  useEffect(() => {
    if (!jobId) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let stopped = false;

    const tick = async () => {
      await useJobsStore.getState().selectJob(jobId);
      if (stopped) return;

      const status = useJobsStore.getState().activeJob?.status;
      if (status && !FINAL_STATUSES.includes(status)) {
        timeoutId = setTimeout(tick, POLL_INTERVAL_MS);
      }
    };

    timeoutId = setTimeout(tick, POLL_INTERVAL_MS);

    return () => {
      stopped = true;
      clearTimeout(timeoutId);
    };
  }, [jobId]);
}
