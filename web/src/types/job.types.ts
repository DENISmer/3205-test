import type { JobDetails } from './job-details.types';

export type JobStatus =
  'pending' | 'in_progress' | 'completed' | 'cancelled' | 'failed';

export interface JobSummary {
  id: string;
  createdAt: string;
  status: JobStatus;
  totalUrls: number;
  processed: number;
  successCount: number;
  errorCount: number;
}

export interface CreateJobRequest {
  urls: string[];
}

export interface CreateJobResponse {
  jobId: string;
}

//zustand

export interface JobsState {
  jobs: JobSummary[];
  activeJobId: string | null;
  activeJob: JobDetails | null;
  loading: boolean;
  error: string | null;

  submitUrls: (urls: string[]) => Promise<void>;
  refreshList: () => Promise<void>;
  selectJob: (id: string) => Promise<void>;
  cancelActiveJob: () => Promise<void>;
}
