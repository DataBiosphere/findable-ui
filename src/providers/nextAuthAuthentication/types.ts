import { Session } from "next-auth";
import { ReactNode } from "react";

export interface NextAuthAuthenticationProviderProps {
  children: ReactNode | ReactNode[];
  refetchInterval?: number;
  session?: Session | null;
  timeout?: number;
}
