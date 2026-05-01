import { requestAuth, resetAuthState } from "../auth/dispatch/auth";
import {
  requestAuthentication,
  resetAuthenticationState,
  updateAuthentication,
} from "../auth/dispatch/authentication";
import { resetCredentialsState } from "../auth/dispatch/credentials";
import { resetTokenState, updateToken } from "../auth/dispatch/token";
import { AUTHENTICATION_STATUS } from "../auth/types/authentication";
import { OAuthProvider } from "../config/entities";
import type {
  CodeResponse,
  GoogleProfile,
  SessionDispatch,
  TokenSetParameters,
} from "./types";
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
    const { authorize, id, profile, userinfo } = provider;
    const resetSession = (): void => {
      dispatch.authDispatch?.(resetAuthState());
      dispatch.authenticationDispatch?.(
        updateAuthentication({
          profile: undefined,
          status: AUTHENTICATION_STATUS.SETTLED,
        }),
      );
      dispatch.tokenDispatch?.(resetTokenState());
    };
    const onAccessToken = (token: string): void => {
      dispatch.authDispatch?.(requestAuth());
      dispatch.authenticationDispatch?.(requestAuthentication());
      dispatch.tokenDispatch?.(updateToken({ providerId: id, token }));
      fetchProfile(userinfo, getAuthenticationRequestOptions(token), {
        onError: resetSession,
        onSuccess: (r: GoogleProfile) =>
          dispatch.authenticationDispatch?.(
            updateAuthentication({
              profile: profile(r),
              status: AUTHENTICATION_STATUS.PENDING, // Authentication is pending until session controller is resolved.
            }),
          ),
      });
    };
    if (authorize) {
      const client = google.accounts.oauth2.initCodeClient({
        callback: (response: CodeResponse) => {
          fetch(authorize, {
            body: JSON.stringify(response),
            headers: { "Content-Type": "application/json" },
            method: "POST",
          })
            .then((r) => {
              if (!r.ok) {
                throw new Error(`authorize request failed (${r.status})`);
              }
              return r.json();
            })
            .then((tokens: TokenSetParameters) => {
              if (!tokens?.access_token) {
                throw new Error("authorize response missing access_token");
              }
              onAccessToken(tokens.access_token);
            })
            .catch(resetSession);
        },
        client_id: provider.clientId,
        scope: provider.authorization.params.scope,
      });
      client.requestCode();
    } else {
      const client = google.accounts.oauth2.initTokenClient({
        callback: (response: TokenSetParameters) =>
          onAccessToken(response.access_token),
        client_id: provider.clientId,
        scope: provider.authorization.params.scope,
      });
      client.requestAccessToken();
    }
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
