import { ElementType, ReactNode } from "react";

export interface GoogleSignInAuthenticationProviderProps {
  APIServicesProvider: ElementType;
  children: ReactNode | ReactNode[];
  timeout?: number;
}
