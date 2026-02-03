import { AUTH_STATUS, AuthState } from "../types/auth";

/**
 * Default auth state.
 */
export const DEFAULT_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  status: AUTH_STATUS.PENDING,
};
