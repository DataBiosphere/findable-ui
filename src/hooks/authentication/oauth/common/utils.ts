import { Dispatch } from "react";
import { AuthProviderConfig } from "../../../../config/entities";
import {
  requestCredentials,
  revokeCredentials,
} from "../../../../providers/authentication/credentials/dispatch";
import { CredentialsAction } from "../../../../providers/authentication/credentials/types";
import { USER_PROVIDER_KEY } from "../../../../providers/authentication/profile/constants";
import {
  requestProfileError,
  requestProfileSuccess,
  resetProfile,
} from "../../../../providers/authentication/profile/dispatch";
import {
  ProfileAction,
  UserProfile,
} from "../../../../providers/authentication/profile/types";
import { getAuthenticationRequestOptions } from "../../../useAuthentication/common/utils";
import { fetchProfile } from "../../profile/utils";
import { OAuthResponse, OAuthRevokeResponse } from "./types";

/**
 * Throws an error if the provider is not configured.
 * @param provider - Provider.
 */
export function assertOAuthProvider(provider?: unknown): void {
  if (isOAuthProvider(provider)) return;
  throw new Error(
    "Open Authentication does not have required token client configured."
  );
}

/**
 * Handles the OAuth request response.
 * - Dispatches request response.
 * @param dispatch - Credentials dispatch.
 * @param response - OAuth request response.
 */
export function handleOAuthRequest(
  dispatch: Dispatch<CredentialsAction<string>> | null,
  response: OAuthResponse
): void {
  const { access_token } = response;
  dispatch?.(requestCredentials(access_token));
}

/**
 * Handles the OAuth request response.
 * - Fetches profile, and dispatches response.
 * @param dispatch - Profile dispatch.
 * @param response - OAuth request response.
 * @param endpoint - OAuth profile endpoint.
 * @param mapProfile - Function; maps profile response to user profile.
 */
export function handleOAuthRequestProfile(
  dispatch: Dispatch<ProfileAction<UserProfile | undefined>> | null,
  response: OAuthResponse,
  endpoint: string,
  mapProfile: (r: unknown) => UserProfile | undefined
): void {
  const { access_token } = response;
  fetchProfile(endpoint, getAuthenticationRequestOptions(access_token), {
    onError: () => dispatch?.(requestProfileError(USER_PROVIDER_KEY)),
    onSuccess: (r) => {
      const profile = mapProfile(r);
      dispatch?.(requestProfileSuccess(USER_PROVIDER_KEY, { profile }));
    },
  });
}

/**
 * Handles the OAuth revoke response.
 * - Dispatches revoked response.
 * @param dispatch - Credentials dispatch.
 * @param response - OAuth revoke response.
 */
export function handleOAuthRevoke(
  dispatch: Dispatch<CredentialsAction<string>> | null,
  response: OAuthRevokeResponse
): void {
  const { successful: isSuccess } = response;
  dispatch?.(revokeCredentials({ isSuccess }));
}

/**
 * Handles resetting the user profile.
 * - Dispatches reset profile.
 * @param dispatch - Profile dispatch.
 */
export function handleResetProfile(
  dispatch: Dispatch<ProfileAction<UserProfile>> | null
): void {
  dispatch?.(resetProfile(USER_PROVIDER_KEY));
}

/**
 * Returns true if the provider is an OAuth provider.
 * @param provider - Provider.
 * @returns provider is OAuth provider.
 */
export function isOAuthProvider(
  provider: unknown
): provider is AuthProviderConfig {
  return (provider as AuthProviderConfig)?.oauth !== undefined;
}
