import { SessionProvider } from "next-auth/react";
import { JSX } from "react";
import { AuthContext } from "../auth/contexts/auth";
import { AuthenticationContext } from "../auth/contexts/authentication";
import { useAuthenticationReducer } from "../auth/hooks/useAuthenticationReducer";
import { useAuthReducer } from "../auth/hooks/useAuthReducer";
import { useSessionIdleTimer } from "../auth/hooks/useSessionIdleTimer";
import { useSessionCallbackUrl } from "../hooks/authentication/session/useSessionCallbackUrl";
import { useLoginTracking } from "../hooks/authentication/useLoginTracking";
import { useNextAuthService } from "./hooks/useNextAuthService";
import { SessionController } from "./session-controller";
import { NextAuthAuthenticationProviderProps } from "./types";

/**
 * NextAuth authentication provider.
 * @param props - Provider props.
 * @param props.children - Children components.
 * @param props.logoutCallbackUrl - When set, the Logout menu action navigates here (so middleware re-runs).
 * @param props.refetchInterval - Session refetch interval in milliseconds.
 * @param props.session - Initial session data.
 * @param props.timeout - Session timeout in milliseconds.
 * @returns authentication provider component.
 */
export function NextAuthAuthenticationProvider({
  children,
  logoutCallbackUrl,
  refetchInterval = 0,
  session,
  timeout,
}: NextAuthAuthenticationProviderProps): JSX.Element {
  const authReducer = useAuthReducer();
  const authenticationReducer = useAuthenticationReducer();
  const service = useNextAuthService(logoutCallbackUrl);
  const { authDispatch, authState } = authReducer;
  const { isAuthenticated } = authState;
  useLoginTracking(isAuthenticated, authState.status);
  const { callbackUrl } = useSessionCallbackUrl();
  useSessionIdleTimer({
    crossTab: true,
    disabled: !isAuthenticated,
    onIdle: () => {
      service.requestLogout({ callbackUrl, redirect: true });
    },
    timeout,
  });
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
