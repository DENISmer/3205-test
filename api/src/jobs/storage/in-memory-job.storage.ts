import { Injectable } from '@nestjs/common';
import { JobStorage } from './job.storage';
import { JobEntity } from '../domain/job.entity';

/**
 * мапинг job ов в памяти
 *
 * save()
 *
 * findById()
 *
 * finAll()
 */
@Injectable()
export class InMemoryJobStorage implements JobStorage {
  private readonly jobs = new Map<string, JobEntity>();

  save(job: JobEntity): void {
    this.jobs.set(job.id, job);
  }

  findById(id: string): JobEntity | undefined {
    return this.jobs.get(id);
  }

  findAll(): JobEntity[] {
    return Array.from(this.jobs.values());
  }

  deleteAll(): void {
    this.jobs.clear();
  }
}
