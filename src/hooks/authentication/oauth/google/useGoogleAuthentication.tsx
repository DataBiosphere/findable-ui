import { useCallback } from "react";
import { useCredentials } from "../../../../providers/authentication/credentials/hook";
import { useProfile } from "../../../../providers/authentication/profile/hook";
import { UserProfile } from "../../../../providers/authentication/profile/types";
import { useAuthenticationConfig } from "../../../useAuthenticationConfig";
import {
  AuthenticationService,
  OAuthResponse,
  OAuthRevokeResponse,
} from "../common/types";
import {
  assertOAuthProvider,
  handleOAuthRequest,
  handleOAuthRequestProfile,
  handleOAuthRevoke,
  handleResetProfile,
} from "../common/utils";
import { PROVIDER_KEY } from "./constants";
import { mapProfile } from "./utils";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO see https://github.com/clevercanary/data-browser/issues/544.
declare const google: any;

export const useGoogleAuthentication = (): AuthenticationService => {
  const {
    credentialsDispatch,
    credentialsState: { credentials },
  } = useCredentials();
  const { profileDispatch } = useProfile<UserProfile | undefined>();
  const { provider: { [PROVIDER_KEY]: provider } = {} } =
    useAuthenticationConfig();
  assertOAuthProvider(provider);

  const login = useCallback(() => {
    const client = google.accounts.oauth2.initTokenClient({
      callback: (response: OAuthResponse) => {
        handleOAuthRequest(credentialsDispatch, response);
        handleOAuthRequestProfile(
          profileDispatch,
          response,
          provider.endpoint,
          mapProfile
        );
      },
      ...provider.oauth,
    });
    client.requestAccessToken();
  }, [credentialsDispatch, profileDispatch, provider]);

  const logout = useCallback(() => {
    google.accounts.oauth2.revoke(
      credentials,
      (response: OAuthRevokeResponse) => {
        handleOAuthRevoke(credentialsDispatch, response);
        handleResetProfile(profileDispatch);
      }
    );
  }, [credentials, credentialsDispatch, profileDispatch]);

  return {
    login,
    logout,
  };
};
