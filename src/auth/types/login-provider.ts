import { ReactNode } from "react";

/**
 * Login provider interface - provider-agnostic representation of an auth provider.
 * This is used by Login components instead of NextAuth's ClientSafeProvider.
 */
export interface LoginProvider {
  icon?: ReactNode;
  id: string;
  name: string;
}
