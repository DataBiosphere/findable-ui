import { Session } from "next-auth";
import { ReactNode } from "react";

export interface NextAuthProviderProps {
  children: ReactNode | ReactNode[];
  session?: Session | null;
  timeout?: number;
}
