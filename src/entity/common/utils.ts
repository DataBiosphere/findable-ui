import { AxiosRequestConfig } from "axios";

/**
 * Returns Axios request configuration.
 * @param accessToken - Access token.
 * @returns Axios request configuration.
 */
export function getAxiosRequestOptions(
  accessToken: string | undefined
): AxiosRequestConfig {
  return {
    headers: accessToken ? { Authorization: "Bearer " + accessToken } : {},
  };
}
