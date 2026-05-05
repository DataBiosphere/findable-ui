import { requestAuth, resetAuthState } from "../../auth/dispatch/auth";
import {
  requestAuthentication,
  resetAuthenticationState,
  updateAuthentication,
} from "../../auth/dispatch/authentication";
import { resetCredentialsState } from "../../auth/dispatch/credentials";
import { resetTokenState, updateToken } from "../../auth/dispatch/token";
import { AUTHENTICATION_STATUS } from "../../auth/types/authentication";
import type { OAuthProvider } from "../../config/entities";
import type { GoogleProfile, SessionDispatch } from "../types";
import { fetchProfile, getAuthenticationRequestOptions } from "../utils/auth";

export type LoginDispatch = Pick<
  SessionDispatch,
  "authDispatch" | "authenticationDispatch" | "tokenDispatch"
>;

/**
 * Creates a function that resets the session state on auth failure.
 * @param dispatch - Dispatch functions for auth state.
 * @returns reset session function.
 */
export function createResetSession(dispatch: LoginDispatch): () => void {
  return (): void => {
    dispatch.authDispatch?.(resetAuthState());
    dispatch.authenticationDispatch?.(
      updateAuthentication({
        profile: undefined,
        status: AUTHENTICATION_STATUS.SETTLED,
      }),
    );
    dispatch.tokenDispatch?.(resetTokenState());
  };
}

/**
 * Creates a function that handles a successful access token.
 * Dispatches auth state updates and fetches the user profile.
 * @param provider - OAuth provider configuration.
 * @param dispatch - Dispatch functions for auth state.
 * @param resetSession - Reset session function.
 * @returns on access token function.
 */
export function createOnAccessToken(
  provider: OAuthProvider,
  dispatch: LoginDispatch,
  resetSession: () => void,
): (token: string) => void {
  const { id, profile, userinfo } = provider;
  return (token: string): void => {
    dispatch.authDispatch?.(requestAuth());
    dispatch.authenticationDispatch?.(requestAuthentication());
    dispatch.tokenDispatch?.(updateToken({ providerId: id, token }));
    fetchProfile(userinfo, getAuthenticationRequestOptions(token), {
      onError: resetSession,
      onSuccess: (r: GoogleProfile) =>
        dispatch.authenticationDispatch?.(
          updateAuthentication({
            profile: profile(r),
            status: AUTHENTICATION_STATUS.PENDING,
          }),
        ),
    });
  };
}

/**
 * Logout and clear all auth state.
 * @param dispatch - Dispatch functions for auth state.
 */
export function logout(dispatch: SessionDispatch): void {
  dispatch.authDispatch?.(resetAuthState());
  dispatch.authenticationDispatch?.(resetAuthenticationState());
  dispatch.credentialsDispatch?.(resetCredentialsState());
  dispatch.tokenDispatch?.(resetTokenState());
}
