import { Session } from "next-auth";
import { ReactNode } from "react";

/**
 * NextAuth authentication provider props.
 */
export interface NextAuthAuthenticationProviderProps {
  children: ReactNode | ReactNode[];
  /**
   * When set, the Logout menu action becomes navigation-driven
   * (`signOut({ redirect: true, callbackUrl })`) so Next middleware can
   * re-run and enforce auth on the next render. Callers of
   * `requestLogout(options)` can still override per-call.
   */
  logoutCallbackUrl?: string;
  refetchInterval?: number;
  session?: Session | null;
  timeout?: number;
}

/**
 * Session controller props.
 */
export interface SessionControllerProps {
  children: ReactNode | ReactNode[];
}
