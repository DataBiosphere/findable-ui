import { AUTH_STATUS, AuthState } from "./types";

export const DEFAULT_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  status: AUTH_STATUS.PENDING,
};
