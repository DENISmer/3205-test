import { Injectable } from '@nestjs/common';

/**
 * похоже стоит аборт сделать отдельно, тк job сущности ни слухом ни духом про запросы. Оставлю пока так
 * TODO: подумать стоит ли их закидывать в job entity
 */
@Injectable()
export class CancellationRegistry {
  private readonly controllers = new Map<string, AbortController>();

  create(jobId: string): AbortController {
    const controller = new AbortController();
    this.controllers.set(jobId, controller);
    return controller;
  }

  abort(jobId: string): void {
    this.controllers.get(jobId)?.abort();
  }

  cleanup(jobId: string): void {
    this.controllers.delete(jobId);
  }
}
