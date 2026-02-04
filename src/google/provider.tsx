import { JSX } from "react";
import { AuthContext } from "../auth/contexts/auth";
import { AuthenticationContext } from "../auth/contexts/authentication";
import { CredentialsContext } from "../auth/contexts/credentials";
import { useAuthenticationReducer } from "../auth/hooks/useAuthenticationReducer";
import { useAuthReducer } from "../auth/hooks/useAuthReducer";
import { useCredentialsReducer } from "../auth/hooks/useCredentialsReducer";
import { useSessionIdleTimer } from "../auth/hooks/useSessionIdleTimer";
import { useSessionActive } from "../hooks/authentication/session/useSessionActive";
import { useSessionCallbackUrl } from "../hooks/authentication/session/useSessionCallbackUrl";
import { AUTH_STATE, AUTHENTICATION_STATE } from "./constants";
import { useGoogleSignInService } from "./hooks/useGoogleSignInService";
import { useTokenReducer } from "./hooks/useTokenReducer";
import { SessionController as DefaultSessionController } from "./session-controller";
import { GoogleSignInAuthenticationProviderProps } from "./types";

/**
 * Google Sign-In authentication provider.
 * @param props - Provider props.
 * @param props.children - Children components.
 * @param props.SessionController - Custom session controller component.
 * @param props.timeout - Session timeout in milliseconds.
 * @returns authentication provider component.
 */
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
