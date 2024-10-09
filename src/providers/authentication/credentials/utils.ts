import { CredentialsState } from "./types";

/**
 * Get initial state.
 * @returns Initial state.
 */
export function initCredentials<C>(): CredentialsState<C> {
  return {
    credentials: undefined,
  };
}
