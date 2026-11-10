import { Options } from "ky";
import { getURL } from "../../shared/utils";

/**
 * Throws unless the URL is on the configured data source's origin, so a request, and the access token it carries, is
 * only ever sent there. A relative URL, such as an entity's API path, is resolved against the data source.
 * @param url - URL to request.
 */
export function assertDataSourceOrigin(url: string): void {
  const dataSourceURL = new URL(getURL());
  if (new URL(url, dataSourceURL).origin === dataSourceURL.origin) return;
  throw new Error(
    `Refusing to request ${url}: it is not on the data source ${dataSourceURL.origin}.`,
  );
}

/**
 * Returns Ky request configuration.
 * @param accessToken - Access token.
 * @returns Ky request configuration.
 */
export function getKyRequestOptions(accessToken: string | undefined): Options {
  return {
    headers: accessToken ? { Authorization: "Bearer " + accessToken } : {},
  };
}
