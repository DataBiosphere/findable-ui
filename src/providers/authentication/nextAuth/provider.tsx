import { SessionProvider } from "next-auth/react";
import React from "react";
import { SessionController } from "../../../components/Authentication/components/SessionController/SessionController";
import { useAuthReducer } from "../../../hooks/authentication/auth/useAuthReducer";
import { useAuthenticationReducer } from "../../../hooks/authentication/authentication/useAuthenticationReducer";
import { useAuthorizationReducer } from "../../../hooks/authentication/authorization/useAuthorizationReducer";
import { useSessionAuth } from "../../../hooks/authentication/session/useSessionAuth";
import { useSessionCallbackUrl } from "../../../hooks/authentication/session/useSessionCallbackUrl";
import { useSessionTimeout } from "../../../hooks/authentication/session/useSessionTimeout";
import { AuthContext } from "../auth/context";
import { AuthenticationContext } from "../authentication/context";
import { AuthorizationContext } from "../authorization/context";
import { useNextAuthService } from "./hooks/useNextAuthService";
import { NextAuthProviderProps } from "./types";

export function NextAuthProvider({
  children,
  session,
  timeout,
}: NextAuthProviderProps): JSX.Element {
  const authReducer = useAuthReducer();
  const authenticationReducer = useAuthenticationReducer();
  const authorizationReducer = useAuthorizationReducer();
  const service = useNextAuthService();
  const { authDispatch, authState } = authReducer;
  const { isAuthenticated } = authState;
  const { callbackUrl } = useSessionCallbackUrl();
  useSessionTimeout({
    disabled: !isAuthenticated,
    onIdle: () => {
      service.requestLogout({ callbackUrl, redirect: true });
    },
    timeout,
  });
  useSessionAuth({ authReducer, authenticationReducer, authorizationReducer });
  return (
    <SessionProvider session={session}>
      <AuthenticationContext.Provider value={authenticationReducer}>
        <AuthorizationContext.Provider value={authorizationReducer}>
          <AuthContext.Provider value={{ authDispatch, authState, service }}>
            <SessionController>{children}</SessionController>
          </AuthContext.Provider>
        </AuthorizationContext.Provider>
      </AuthenticationContext.Provider>
    </SessionProvider>
  );
}
