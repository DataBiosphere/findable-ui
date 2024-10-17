import ky, { KyInstance, Options, ResponsePromise } from "ky";
import { getURL } from "../../shared/utils";

let kyInstance: KyInstance | null = null;

/**
 * Makes an HTTP request with the API URL as a base.
 * @param url - URL to fetch.
 * @param options - Ky options.
 * @returns Ky response.
 */
export function fetchApi<T>(
  url: string,
  options: Options = {}
): ResponsePromise<T> {
  if (!kyInstance) {
    kyInstance = ky.create({
      prefixUrl: getURL(),
      retry: {
        delay: (attemptCount) => 1000 * 3 ** (attemptCount - 1),
        limit: 3,
      },
      timeout: 20 * 1000,
    });
  }
  // If a full URL is provided, there shouldn't be a prefix URL. Otherwise, Ky requires that the URL not start with a slash.
  if (/^https?:\/\//.test(url)) options = { prefixUrl: "", ...options };
  else url = url.replace(/^\//, "");
  return kyInstance.get(url, options);
}
