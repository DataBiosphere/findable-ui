import { Session } from "next-auth";
import { ReactNode } from "react";

/**
 * NextAuth authentication provider props.
 */
export interface NextAuthAuthenticationProviderProps {
  children: ReactNode | ReactNode[];
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
