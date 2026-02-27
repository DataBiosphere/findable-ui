import { ERROR_MESSAGE } from "./constants";

/**
 * Fetches a response from the given API URL.
 * @param url - Request URL.
 * @param query - Query to send.
 * @param options - Fetch options.
 * @param options.controller - AbortController.
 * @param options.onError - Callback invoked on error.
 * @param options.onSettled - Callback invoked when the request is settled (after success or error).
 * @param options.onSuccess - Callback invoked with response data on success.
 * @returns Promise that resolves when the request completes.
 */
export async function fetchResponse<T = unknown>(
  url: string,
  query: string,
  {
    controller,
    onError,
    onSettled,
    onSuccess,
  }: {
    controller: AbortController;
    onError: (error: Error) => void;
    onSettled: () => void;
    onSuccess: (data: T) => void;
  },
): Promise<T | undefined> {
  const timeout = setTimeout(() => controller.abort(), 90_000);

  try {
    const res = await fetch(url, {
      body: JSON.stringify({ query }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
      signal: controller.signal,
    });

    const { status } = res;

    if (status === 429) {
      onError(new Error(ERROR_MESSAGE.RATE_LIMITED));
      return;
    }

    if (!res.ok) throw new Error(`${ERROR_MESSAGE.REQUEST_FAILED} (${status})`);

    const data = await res.json();
    onSuccess(data);
  } catch (error) {
    if (controller.signal.aborted) return;
    if (error instanceof Error) onError(error);
    else onError(new Error(ERROR_MESSAGE.UNKNOWN));
  } finally {
    clearTimeout(timeout);
    onSettled();
  }
}
