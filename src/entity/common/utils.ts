import { Options } from "ky";

/**
 * Returns headers for Ky request.
 * @param accessToken - Access token.
 * @returns Headers.
 */
export function buildHeaders(
  accessToken: string | undefined,
): Options["headers"] {
  if (!accessToken) return {};

  return { Authorization: "Bearer " + accessToken };
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
