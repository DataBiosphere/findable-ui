import { ElementType, ReactNode } from "react";

export interface GoogleSignInAuthenticationProviderProps {
  children: ReactNode | ReactNode[];
  SessionController?: ElementType;
  timeout?: number;
}
