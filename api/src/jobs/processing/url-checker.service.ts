import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlCheckerService {
  /**
   * сам процесс проверки урла + HEAD`
   */
  async check(
    url: string,
    signal: AbortSignal,
  ): Promise<{ httpStatus: number } | { error: string }> {
    //
    try {
      const response = await fetch(url, { method: 'HEAD', signal });
      return { httpStatus: response.status };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'unknown error' };
    }
  }
}
