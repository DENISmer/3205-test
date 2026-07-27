import { Injectable } from '@nestjs/common';
import { JobEntity } from '../domain/job.entity';
import { UrlCheckerService } from './url-checker.service';
import { UrlCheckEntity } from '../domain/url-check.entity';
import { CancellationRegistry } from './cancellation.registry';
import { sleep } from '../../utils/sleep';

const WORKERS_PER_JOB = 5;

@Injectable()
export class JobRunnerService {
  constructor(
    private readonly urlChecker: UrlCheckerService,
    private readonly cancellationRegistry: CancellationRegistry,
  ) {}

  run(job: JobEntity): void {
    const { signal } = this.cancellationRegistry.create(job.id);
    job.start();

    const queue = [...job.urlChecks];

    const worker = async () => {
      let urlCheck: UrlCheckEntity | undefined;
      while ((urlCheck = queue.shift())) {
        if (signal.aborted) {
          urlCheck.cancel();
          job.applyUrlResult(urlCheck);
          continue;
        }

        urlCheck.start();
        const result = await this.urlChecker.check(urlCheck.url, signal);
        const cancelled = await sleep(Math.random() * 10_000, signal).then(
          () => false,
          () => true,
        );

        if (cancelled) urlCheck.cancel();
        else if ('httpStatus' in result) urlCheck.succeed(result.httpStatus);
        else urlCheck.fail(result.error);

        job.applyUrlResult(urlCheck);
      }
    };

    Promise.allSettled(Array.from({ length: WORKERS_PER_JOB }, worker)).then(
      () => this.cancellationRegistry.cleanup(job.id),
    );
  }
}
