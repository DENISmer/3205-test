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
