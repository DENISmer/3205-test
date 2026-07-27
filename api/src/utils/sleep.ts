/**
 * Делаем по-красоте, проверяем аборт и резолвим/реджетким
 * @param ms
 * @param signal
 * @returns
 */
export function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new Error('Aborted'));
      return;
    }

    const timeout = setTimeout(resolve, ms);

    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timeout);
        reject(new Error('Aborted'));
      },
      { once: true },
    );
  });
}
