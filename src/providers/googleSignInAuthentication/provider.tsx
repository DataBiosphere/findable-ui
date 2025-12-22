import { JSX } from "react";
import { SessionController as DefaultSessionController } from "../../components/Authentication/components/SessionController/components/GoogleSessionController/SessionController";
import { useAuthReducer } from "../../hooks/authentication/auth/useAuthReducer";
import { useAuthenticationReducer } from "../../hooks/authentication/authentication/useAuthenticationReducer";
import { useCredentialsReducer } from "../../hooks/authentication/credentials/useCredentialsReducer";
import { useSessionActive } from "../../hooks/authentication/session/useSessionActive";
import { useSessionCallbackUrl } from "../../hooks/authentication/session/useSessionCallbackUrl";
import { useSessionIdleTimer } from "../../hooks/authentication/session/useSessionIdleTimer";
import { useTokenReducer } from "../../hooks/authentication/token/useTokenReducer";
import { AuthContext } from "../authentication/auth/context";
import { AuthenticationContext } from "../authentication/authentication/context";
import { CredentialsContext } from "../authentication/credentials/context";
import { AUTH_STATE, AUTHENTICATION_STATE } from "./constants";
import { useGoogleSignInService } from "./hooks/useGoogleSignInService";
import { GoogleSignInAuthenticationProviderProps } from "./types";

export function GoogleSignInAuthenticationProvider({
  children,
  SessionController = DefaultSessionController,
  timeout,
}: GoogleSignInAuthenticationProviderProps): JSX.Element {
  const authReducer = useAuthReducer(AUTH_STATE);
  const authenticationReducer = useAuthenticationReducer(AUTHENTICATION_STATE);
  const credentialsReducer = useCredentialsReducer();
  const tokenReducer = useTokenReducer(); // Reducer, local to Google Sign-In process only.
  const service = useGoogleSignInService({
    authReducer,
    authenticationReducer,
    credentialsReducer,
    tokenReducer,
  });
  const { callbackUrl } = useSessionCallbackUrl();
  const { authDispatch, authState } = authReducer;
  const { isAuthenticated } = authState;
  const { authenticationState } = authenticationReducer;
  useSessionActive(authState, authenticationState);
  useSessionIdleTimer({
    disabled: !isAuthenticated,
    onIdle: () => service.requestLogout({ callbackUrl }),
    timeout,
  });
  return (
    <CredentialsContext.Provider value={credentialsReducer}>
      <AuthenticationContext.Provider value={authenticationReducer}>
        <AuthContext.Provider value={{ authDispatch, authState, service }}>
          <SessionController token={tokenReducer.tokenState.token}>
            {children}
          </SessionController>
        </AuthContext.Provider>
      </AuthenticationContext.Provider>
    </CredentialsContext.Provider>
  );
}
