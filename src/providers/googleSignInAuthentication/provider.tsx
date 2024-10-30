import React from "react";
import { useAuthReducer } from "../../hooks/authentication/auth/useAuthReducer";
import { useAuthenticationReducer } from "../../hooks/authentication/authentication/useAuthenticationReducer";
import { useAuthorizationReducer } from "../../hooks/authentication/authorization/useAuthorizationReducer";
import { useCredentialsReducer } from "../../hooks/authentication/credentials/useCredentialsReducer";
import { useSessionActive } from "../../hooks/authentication/session/useSessionActive";
import { useSessionAuth } from "../../hooks/authentication/session/useSessionAuth";
import { useSessionCallbackUrl } from "../../hooks/authentication/session/useSessionCallbackUrl";
import { useSessionCredentials } from "../../hooks/authentication/session/useSessionCredentials";
import { useSessionTimeout } from "../../hooks/authentication/session/useSessionTimeout";
import { useTokenReducer } from "../../hooks/authentication/token/useTokenReducer";
import { AuthContext } from "../authentication/auth/context";
import { AuthenticationContext } from "../authentication/authentication/context";
import { AuthorizationContext } from "../authentication/authorization/context";
import { CredentialsContext } from "../authentication/credentials/context";
import {
  AUTH_STATE,
  AUTHENTICATION_STATE,
  AUTHORIZATION_STATE,
} from "./contants";
import { useGoogleSignInService } from "./hooks/useGoogleSignInService";
import { GoogleSignInAuthenticationProviderProps } from "./types";

export function GoogleSignInAuthenticationProvider({
  APIServicesProvider,
  children,
  timeout,
}: GoogleSignInAuthenticationProviderProps): JSX.Element {
  const authReducer = useAuthReducer(AUTH_STATE);
  const authenticationReducer = useAuthenticationReducer(AUTHENTICATION_STATE);
  const authorizationReducer = useAuthorizationReducer(AUTHORIZATION_STATE);
  const credentialsReducer = useCredentialsReducer();
  const tokenReducer = useTokenReducer(); // Reducer, local to Google Sign-In process only.
  const service = useGoogleSignInService({
    authenticationReducer,
    authorizationReducer,
    credentialsReducer,
    tokenReducer,
  });
  const { callbackUrl } = useSessionCallbackUrl();
  const { authDispatch, authState } = authReducer;
  const { isAuthenticated } = authState;
  useSessionActive(authState);
  useSessionTimeout({
    disabled: !isAuthenticated,
    onIdle: () => service.requestLogout({ callbackUrl }),
    timeout,
  });
  useSessionCredentials(authState, credentialsReducer, tokenReducer);
  useSessionAuth({ authReducer, authenticationReducer, authorizationReducer });
  return (
    <CredentialsContext.Provider value={credentialsReducer}>
      <AuthenticationContext.Provider value={authenticationReducer}>
        <AuthorizationContext.Provider value={authorizationReducer}>
          <AuthContext.Provider value={{ authDispatch, authState, service }}>
            <APIServicesProvider token={tokenReducer.tokenState.token}>
              {children}
            </APIServicesProvider>
          </AuthContext.Provider>
        </AuthorizationContext.Provider>
      </AuthenticationContext.Provider>
    </CredentialsContext.Provider>
  );
}
