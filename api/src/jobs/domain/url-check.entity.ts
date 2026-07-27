import { UrlStatus } from '../../types';

export class UrlCheckEntity {
  readonly url: string;
  status: UrlStatus = UrlStatus.Pending;
  httpStatus?: number;
  error?: string;
  startedAt?: Date;
  finishedAt?: Date;
  durationMs?: number;

  constructor(url: string) {
    this.url = url;
  }

  start(): void {
    this.status = UrlStatus.InProgress;
    this.startedAt = new Date();
  }

  succeed(httpStatus: number): void {
    this.status = UrlStatus.Success;
    this.httpStatus = httpStatus;
    this.finish();
  }

  fail(error: string): void {
    this.status = UrlStatus.Error;
    this.error = error;
    this.finish();
  }

  cancel(): void {
    this.status = UrlStatus.Cancelled;
    if (this.startedAt) {
      this.finish();
    }
  }

  private finish(): void {
    this.finishedAt = new Date();
    this.durationMs = this.finishedAt.getTime() - this.startedAt!.getTime();
  }
}
