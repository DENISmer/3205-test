import { JobStatus, UrlStatus } from './job-status';

export interface CreateJobDto {
  urls: string[];
}

export interface UrlCheckDto {
  url: string;
  status: UrlStatus;
  httpStatus?: number;
  error?: string;
  startedAt?: string;
  finishedAt?: string;
  durationMs?: number;
}

export interface JobSummaryDto {
  id: string;
  createdAt: string;
  status: JobStatus;
  totalUrls: number;
  successCount: number;
  errorCount: number;
}

export interface JobDetailsDto extends JobSummaryDto {
  urls: UrlCheckDto[];
}
