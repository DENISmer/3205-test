import { JobStatus, UrlStatus } from './job-status';
import {
  IsArray,
  ArrayNotEmpty,
  ArrayMaxSize,
  ArrayUnique,
  IsUrl,
} from 'class-validator';

export class CreateJobDto {
  @IsArray() // urls должно быть массивом
  @ArrayNotEmpty()
  @ArrayMaxSize(100)
  @ArrayUnique()
  @IsUrl({}, { each: true })
  urls!: string[];
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

export interface CreateJobResponseDto {
  jobId: string;
}
