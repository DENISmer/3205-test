import type {
  JobSummary,
  CreateJobRequest,
  CreateJobResponse,
} from '../types/job.types';
import type { JobDetails } from '../types/job-details.types';

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new HttpError(response.status, body?.message ?? response.statusText);
  }

  return response.json() as Promise<T>;
}

export function createJob(urls: string[], signal?: AbortSignal) {
  return request<CreateJobResponse>('/jobs', {
    method: 'POST',
    body: JSON.stringify({ urls } satisfies CreateJobRequest),
    signal,
  });
}

export function getJobs(signal?: AbortSignal) {
  return request<JobSummary[]>('/jobs', { method: 'GET', signal });
}

export function getJob(id: string, signal?: AbortSignal) {
  return request<JobDetails>(`/jobs/${id}`, { method: 'GET', signal });
}

export function cancelJob(id: string, signal?: AbortSignal) {
  return request<JobDetails>(`/jobs/${id}`, { method: 'DELETE', signal });
}
