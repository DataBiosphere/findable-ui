import { requestAuth, resetAuthState } from "../auth/dispatch/auth";
import {
  requestAuthentication,
  resetAuthenticationState,
  updateAuthentication,
} from "../auth/dispatch/authentication";
import { resetCredentialsState } from "../auth/dispatch/credentials";
import { resetTokenState, updateToken } from "../auth/dispatch/token";
import { AUTHENTICATION_STATUS } from "../auth/types/authentication";
import { OAuthProvider } from "../auth/types/provider";
import { GoogleProfile, SessionDispatch, TokenSetParameters } from "./types";
import { fetchProfile, getAuthenticationRequestOptions } from "./utils/auth";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO see https://github.com/clevercanary/data-browser/issues/544.
declare const google: any;

/**
 * Google Sign-In service.
 */
export const service = {
  /**
   * Login with Google OAuth.
   * @param provider - OAuth provider configuration.
   * @param dispatch - Dispatch functions for auth state.
   */
  login: (
    provider: OAuthProvider,
    dispatch: Pick<
      SessionDispatch,
      "authDispatch" | "authenticationDispatch" | "tokenDispatch"
    >,
  ): void => {
    const client = google.accounts.oauth2.initTokenClient({
      callback: (response: TokenSetParameters) => {
        const { id, profile, userinfo } = provider;
        const { access_token: token } = response;
        dispatch.authDispatch?.(requestAuth());
        dispatch.authenticationDispatch?.(requestAuthentication());
        dispatch.tokenDispatch?.(updateToken({ providerId: id, token }));
        fetchProfile(userinfo, getAuthenticationRequestOptions(token), {
          onError: () => {
            dispatch.authDispatch?.(resetAuthState());
            dispatch.authenticationDispatch?.(
              updateAuthentication({
                profile: undefined,
                status: AUTHENTICATION_STATUS.SETTLED,
              }),
            );
            dispatch.tokenDispatch?.(resetTokenState());
          },
          onSuccess: (r: GoogleProfile) =>
            dispatch.authenticationDispatch?.(
              updateAuthentication({
                profile: profile(r),
                status: AUTHENTICATION_STATUS.PENDING, // Authentication is pending until session controller is resolved.
              }),
            ),
        });
      },
      client_id: provider.clientId,
      scope: provider.authorization.params.scope,
    });
    client.requestAccessToken();
  },
  /**
   * Logout and clear all auth state.
   * @param dispatch - Dispatch functions for auth state.
   */
  logout: (dispatch: SessionDispatch): void => {
    dispatch.authDispatch?.(resetAuthState());
    dispatch.authenticationDispatch?.(resetAuthenticationState());
    dispatch.credentialsDispatch?.(resetCredentialsState());
    dispatch.tokenDispatch?.(resetTokenState());
  },
};
