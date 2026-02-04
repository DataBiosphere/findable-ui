import { SessionProvider } from "next-auth/react";
import { JSX } from "react";
import { AuthContext } from "../auth/contexts/auth";
import { AuthenticationContext } from "../auth/contexts/authentication";
import { useAuthenticationReducer } from "../auth/hooks/useAuthenticationReducer";
import { useAuthReducer } from "../auth/hooks/useAuthReducer";
import { useSessionIdleTimer } from "../auth/hooks/useSessionIdleTimer";
import { useSessionCallbackUrl } from "../hooks/authentication/session/useSessionCallbackUrl";
import { useNextAuthService } from "./hooks/useNextAuthService";
import { SessionController } from "./session-controller";
import { NextAuthAuthenticationProviderProps } from "./types";

/**
 * NextAuth authentication provider.
 * @param props - Provider props.
 * @param props.children - Children components.
 * @param props.refetchInterval - Session refetch interval in milliseconds.
 * @param props.session - Initial session data.
 * @param props.timeout - Session timeout in milliseconds.
 * @returns authentication provider component.
 */
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
