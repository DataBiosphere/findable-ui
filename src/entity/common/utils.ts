import { Options } from "ky";

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
