import { randomUUID } from 'crypto';
import { JobStatus, UrlStatus } from '../../types';
import { UrlCheckEntity } from './url-check.entity';

export class JobEntity {
  readonly id: string;
  readonly createdAt: Date;
  status: JobStatus = JobStatus.Pending;
  readonly urlChecks: UrlCheckEntity[];
  successCount = 0;
  errorCount = 0;

  constructor(urls: string[]) {
    this.id = randomUUID();
    this.createdAt = new Date();
    this.urlChecks = urls.map((url) => new UrlCheckEntity(url));
  }

  start(): void {
    if (this.status !== JobStatus.Pending) return;
    this.status = JobStatus.InProgress;
  }

  applyUrlResult(urlCheck: UrlCheckEntity): void {
    if (urlCheck.status === UrlStatus.Success) {
      this.successCount++;
    } else if (urlCheck.status === UrlStatus.Error) {
      this.errorCount++;
    }

    if (this.allUrlChecksSettled()) {
      this.status = JobStatus.Completed;
    }
  }

  cancel(): void {
    if (this.isFinal()) return;

    this.status = JobStatus.Cancelled;
    for (const urlCheck of this.urlChecks) {
      if (urlCheck.status === UrlStatus.Pending) {
        urlCheck.cancel();
      }
    }
  }

  private allUrlChecksSettled(): boolean {
    return this.urlChecks.every((u) =>
      [UrlStatus.Success, UrlStatus.Error, UrlStatus.Cancelled].includes(
        u.status,
      ),
    );
  }

  isFinal(): boolean {
    return [
      JobStatus.Completed,
      JobStatus.Cancelled,
      JobStatus.Failed,
    ].includes(this.status);
  }
}
