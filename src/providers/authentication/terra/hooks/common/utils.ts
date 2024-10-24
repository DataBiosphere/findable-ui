import {
  LOGIN_STATUS_NOT_STARTED,
  LOGIN_STATUS_NOT_SUPPORTED,
} from "./constants";
import { LoginResponse, LoginStatus } from "./entities";

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
 * Returns login status.
 * An undefined endpoint will return a not supported login status,
 * otherwise a not started login status is returned.
 * @param endpoint - Endpoint.
 * @returns initial login status.
 */
export function initLoginStatus(endpoint?: string): LoginStatus<LoginResponse> {
  if (!endpoint) {
    // Endpoint not supported.
    return LOGIN_STATUS_NOT_SUPPORTED;
  }
  return LOGIN_STATUS_NOT_STARTED;
}
