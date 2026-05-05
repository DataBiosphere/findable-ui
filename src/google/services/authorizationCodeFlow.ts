import type { OAuthProvider } from "../../config/entities";
import type { CodeResponse, TokenSetParameters } from "../types";
import {
  createOnAccessToken,
  createResetSession,
  type LoginDispatch,
} from "./common";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO see https://github.com/clevercanary/data-browser/issues/544.
declare const google: any;

/**
 * Login using the OAuth 2.0 authorization code flow.
 * Uses Google's initCodeClient to request an authorization code,
 * then exchanges it for an access token via the configured authorize endpoint.
 * @param provider - OAuth provider configuration (must have authorize set).
 * @param dispatch - Dispatch functions for auth state.
 */
export function login(provider: OAuthProvider, dispatch: LoginDispatch): void {
  const { authorize } = provider;
  const resetSession = createResetSession(dispatch);
  const onAccessToken = createOnAccessToken(provider, dispatch, resetSession);
  const client = google.accounts.oauth2.initCodeClient({
    callback: (response: CodeResponse) => {
      fetch(authorize as string, {
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
}
