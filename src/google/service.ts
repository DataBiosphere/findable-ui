import { OAUTH_FLOW, type OAuthProvider } from "../config/entities";
import { login as authorizationCodeFlowLogin } from "./services/authorizationCodeFlow";
import { logout, type LoginDispatch } from "./services/common";
import { login as implicitFlowLogin } from "./services/implicitFlow";
import type { SessionDispatch } from "./types";

/**
 * Google Sign-In service.
 */
export const service = {
  /**
   * Login with Google OAuth.
   * Dispatches to the configured flow based on `provider.flow`.
   * @param provider - OAuth provider configuration.
   * @param dispatch - Dispatch functions for auth state.
   */
  login: (provider: OAuthProvider, dispatch: LoginDispatch): void => {
    if (provider.flow === OAUTH_FLOW.AUTHORIZATION_CODE) {
      authorizationCodeFlowLogin(provider, dispatch);
    } else {
      implicitFlowLogin(provider, dispatch);
    }
  },
  /**
   * Logout and clear all auth state.
   * @param dispatch - Dispatch functions for auth state.
   */
  logout: (dispatch: SessionDispatch): void => {
    logout(dispatch);
  },
};
