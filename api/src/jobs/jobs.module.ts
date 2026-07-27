import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobRunnerService } from './processing/job-runner.service';
import { UrlCheckerService } from './processing/url-checker.service';
import { CancellationRegistry } from './processing/cancellation.registry';
import { JOB_STORAGE } from './storage/job.storage';
import { InMemoryJobStorage } from './storage/in-memory-job.storage';

@Module({
  controllers: [JobsController],
  providers: [
    JobsService,
    JobRunnerService,
    UrlCheckerService,
    CancellationRegistry,
    { provide: JOB_STORAGE, useClass: InMemoryJobStorage },
  ],
})
export class JobsModule {}
