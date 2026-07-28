import type { JobSummary } from './job.types';

export type UrlStatus =
  'pending' | 'in_progress' | 'success' | 'error' | 'cancelled';

export interface UrlCheck {
  url: string;
  status: UrlStatus;
  httpStatus?: number;
  error?: string;
  startedAt?: string;
  finishedAt?: string;
  durationMs?: number;
}

export interface JobDetails extends JobSummary {
  urls: UrlCheck[];
}
