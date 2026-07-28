import { JobEntity } from '../domain/job.entity';

export const JOB_STORAGE = Symbol('JOB_STORAGE');

export interface JobStorage {
  save(job: JobEntity): void;
  findById(id: string): JobEntity | undefined;
  findAll(): JobEntity[];
  deleteAll(): void;
}
