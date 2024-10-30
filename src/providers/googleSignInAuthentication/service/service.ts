import { OAuthProvider } from "../../../config/entities";
import {
  requestAuthentication,
  resetState as resetAuthenticationState,
  updateAuthentication,
} from "../../authentication/authentication/dispatch";
import { AUTHENTICATION_STATUS } from "../../authentication/authentication/types";
import { fetchProfile } from "../../authentication/authentication/utils";
import {
  requestAuthorization,
  resetState as resetAuthorizationState,
} from "../../authentication/authorization/dispatch";
import { resetState as resetCredentialsState } from "../../authentication/credentials/dispatch";
import { getAuthenticationRequestOptions } from "../../authentication/terra/hooks/common/utils";
import {
  resetState as resetTokenState,
  updateToken,
} from "../../authentication/token/dispatch";
import { SessionDispatch } from "../common/types";
import { GoogleProfile, TokenSetParameters } from "../profile/types";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO see https://github.com/clevercanary/data-browser/issues/544.
declare const google: any;

export const service = {
  login: (
    provider: OAuthProvider,
    dispatch: Pick<
      SessionDispatch,
      "authenticationDispatch" | "authorizationDispatch" | "tokenDispatch"
    >
  ): void => {
    const client = google.accounts.oauth2.initTokenClient({
      callback: (response: TokenSetParameters) => {
        const { id, profile, userinfo } = provider;
        const { access_token: token } = response;
        dispatch.tokenDispatch?.(updateToken({ providerId: id, token }));
        fetchProfile(userinfo, getAuthenticationRequestOptions(token), {
          onError: () =>
            dispatch.authenticationDispatch?.(
              updateAuthentication({
                profile: undefined,
                status: AUTHENTICATION_STATUS.UNAUTHENTICATED,
              })
            ),
          onSuccess: (r: GoogleProfile) =>
            dispatch.authenticationDispatch?.(
              updateAuthentication({
                profile: profile(r),
                status: AUTHENTICATION_STATUS.AUTHENTICATED,
              })
            ),
        });
      },
      client_id: provider.clientId,
      scope: provider.authorization.params.scope,
    });
    dispatch.authenticationDispatch?.(requestAuthentication());
    dispatch.authorizationDispatch?.(requestAuthorization());
    client.requestAccessToken();
  },
  logout: (dispatch: SessionDispatch): void => {
    dispatch.authenticationDispatch?.(resetAuthenticationState());
    dispatch.authorizationDispatch?.(resetAuthorizationState());
    dispatch.credentialsDispatch?.(resetCredentialsState());
    dispatch.tokenDispatch?.(resetTokenState());
  },
};
