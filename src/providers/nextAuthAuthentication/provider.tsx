import { SessionProvider } from "next-auth/react";
import React from "react";
import { SessionController } from "../../components/Authentication/components/SessionController/components/NextSessionController/SessionController";
import { useAuthReducer } from "../../hooks/authentication/auth/useAuthReducer";
import { useAuthenticationReducer } from "../../hooks/authentication/authentication/useAuthenticationReducer";
import { useSessionAuth } from "../../hooks/authentication/session/useSessionAuth";
import { useSessionCallbackUrl } from "../../hooks/authentication/session/useSessionCallbackUrl";
import { useSessionIdleTimer } from "../../hooks/authentication/session/useSessionIdleTimer";
import { AuthContext } from "../authentication/auth/context";
import { AuthenticationContext } from "../authentication/authentication/context";
import { useNextAuthService } from "./hooks/useNextAuthService";
import { NextAuthAuthenticationProviderProps } from "./types";

export function NextAuthAuthenticationProvider({
  children,
  refetchInterval = 0,
  session,
  timeout,
}: NextAuthAuthenticationProviderProps): JSX.Element {
  const authReducer = useAuthReducer();
  const authenticationReducer = useAuthenticationReducer();
  const service = useNextAuthService();
  const { authDispatch, authState } = authReducer;
  const { isAuthenticated } = authState;
  const { callbackUrl } = useSessionCallbackUrl();
  useSessionIdleTimer({
    crossTab: true,
    disabled: !isAuthenticated,
    onIdle: () => {
      service.requestLogout({ callbackUrl, redirect: true });
    },
    timeout,
  });
  useSessionAuth({ authReducer, authenticationReducer });
  return (
    <SessionProvider session={session} refetchInterval={refetchInterval / 1000}>
      <AuthenticationContext.Provider value={authenticationReducer}>
        <AuthContext.Provider value={{ authDispatch, authState, service }}>
          <SessionController>{children}</SessionController>
        </AuthContext.Provider>
      </AuthenticationContext.Provider>
    </SessionProvider>
  );
}
