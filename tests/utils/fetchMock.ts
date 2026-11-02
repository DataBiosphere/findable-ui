import fetchMock from "jest-fetch-mock";

/**
 * Returns the requests made to the mocked fetch.
 * @returns Requests.
 */
export function getRequests(): Request[] {
  return fetchMock.mock.calls.map(([request]) => request as Request);
}

/**
 * Replaces the global fetch with the mocked fetch, so that ky's requests reach it.
 */
export function mockGlobalFetch(): void {
  fetchMock.doMock();
  globalThis.fetch = ((...args) => {
    return fetchMock(...(args as Parameters<typeof fetchMock>));
  }) as typeof fetch;
}
