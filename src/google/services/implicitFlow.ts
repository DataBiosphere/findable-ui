import type { OAuthProvider } from "../../config/entities";
import type { TokenSetParameters } from "../types";
import {
  createOnAccessToken,
  createResetSession,
  type LoginDispatch,
} from "./common";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO see https://github.com/clevercanary/data-browser/issues/544.
declare const google: any;

/**
 * Login using the OAuth 2.0 implicit flow.
 * Uses Google's initTokenClient to request an access token directly.
 * @param provider - OAuth provider configuration.
 * @param dispatch - Dispatch functions for auth state.
 */
export function login(provider: OAuthProvider, dispatch: LoginDispatch): void {
  const resetSession = createResetSession(dispatch);
  const onAccessToken = createOnAccessToken(provider, dispatch, resetSession);
  const client = google.accounts.oauth2.initTokenClient({
    callback: (response: TokenSetParameters) =>
      onAccessToken(response.access_token),
    client_id: provider.clientId,
    scope: provider.authorization.params.scope,
  });
  client.requestAccessToken();
}
