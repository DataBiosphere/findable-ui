/**
 * Returns the options for an authentication request.
 * @param token - Token.
 * @returns request options.
 */
export function getAuthenticationRequestOptions(token: string): RequestInit {
  const headers = new Headers();
  headers.append("authorization", "Bearer " + token);
  return { headers };
}

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
  },
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
