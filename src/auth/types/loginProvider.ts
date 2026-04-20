import { ReactNode } from "react";
import { ProviderId } from "./common";

/**
 * Login provider interface - provider-agnostic representation of an auth provider.
 * This is used by Login components instead of NextAuth's ClientSafeProvider.
 */
export interface LoginProvider {
  icon?: ReactNode;
  id: ProviderId;
  name: string;
}
