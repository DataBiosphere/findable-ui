/**
 * Fetches data from given endpoint and options.
 * @param endpoint - Endpoint.
 * @param options - Request options.
 * @param callback - Callback.
 * @param callback.onError - Error callback.
 * @param callback.onSuccess - Success callback.
 */
export function fetchProfile<R, E>(
  endpoint: string,
  options?: RequestInit,
  callback?: {
    onError: (error: E) => void;
    onSuccess: (response: R) => void;
  }
): void {
  fetch(endpoint, options)
    .then((response) => response.json())
    .then((r: R) => {
      callback?.onSuccess(r);
    })
    .catch((e: E) => {
      callback?.onError(e);
    });
}
