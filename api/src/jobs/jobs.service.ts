import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateJobDto,
  CreateJobResponseDto,
  JobDetailsDto,
  JobSummaryDto,
} from '../types';
import { JobEntity } from './domain/job.entity';
import { JOB_STORAGE, type JobStorage } from './storage/job.storage';
import { JobRunnerService } from './processing/job-runner.service';
import { CancellationRegistry } from './processing/cancellation.registry';

@Injectable()
export class JobsService {
  constructor(
    @Inject(JOB_STORAGE) private readonly storage: JobStorage,
    private readonly jobRunner: JobRunnerService,
    private readonly cancellationRegistry: CancellationRegistry,
  ) {}

  create(dto: CreateJobDto): CreateJobResponseDto {
    const job = new JobEntity(dto.urls);
    this.storage.save(job);
    this.jobRunner.run(job);
    return { jobId: job.id };
  }

  findAll(): JobSummaryDto[] {
    return this.storage.findAll().map((job) => this.toSummaryDto(job));
  }

  findOne(id: string): JobDetailsDto {
    const job = this.findOrThrow(id);
    return this.toDetailsDto(job);
  }

  cancel(id: string): JobDetailsDto {
    const job = this.findOrThrow(id);
    if (job.isFinal()) {
      throw new ConflictException(`Job ${id} is already finished`);
    }

    job.cancel();
    this.cancellationRegistry.abort(id);
    return this.toDetailsDto(job);
  }

  deleteAll(): void {
    for (const job of this.storage.findAll()) {
      if (!job.isFinal()) {
        job.cancel();
        this.cancellationRegistry.abort(job.id);
      }
    }

    this.storage.deleteAll();
  }

  findOrThrow(id: string): JobEntity {
    const job = this.storage.findById(id);
    if (!job) throw new NotFoundException(`Job ${id} not found`);
    return job;
  }

  private toSummaryDto(job: JobEntity): JobSummaryDto {
    return {
      id: job.id,
      createdAt: job.createdAt.toISOString(),
      status: job.status,
      totalUrls: job.urlChecks.length,
      successCount: job.successCount,
      errorCount: job.errorCount,
    };
  }

  private toDetailsDto(job: JobEntity): JobDetailsDto {
    return {
      ...this.toSummaryDto(job),
      urls: job.urlChecks.map((u) => ({
        url: u.url,
        status: u.status,
        httpStatus: u.httpStatus,
        error: u.error,
        startedAt: u.startedAt?.toISOString(),
        finishedAt: u.finishedAt?.toISOString(),
        durationMs: u.durationMs,
      })),
    };
  }
}
