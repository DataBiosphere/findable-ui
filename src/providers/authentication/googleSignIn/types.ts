import { ElementType, ReactNode } from "react";

export interface GoogleSignInProviderProps {
  APIServicesProvider: ElementType;
  children: ReactNode | ReactNode[];
  timeout?: number;
}
