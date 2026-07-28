import { useEffect } from 'react';
import { useJobsStore } from '../store/jobs.store';

const POLL_INTERVAL_MS = 2000;

export function useJobListPolling() {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = async () => {
      await useJobsStore.getState().refreshList();
      timeoutId = setTimeout(tick, POLL_INTERVAL_MS);
    };

    timeoutId = setTimeout(tick, POLL_INTERVAL_MS);

    return () => clearTimeout(timeoutId);
  }, []);
}
