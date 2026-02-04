import {
  AUTHENTICATION_STATUS,
  AuthenticationState,
} from "../types/authentication";

/**
 * Default authentication state.
 */
export const DEFAULT_AUTHENTICATION_STATE: AuthenticationState = {
  profile: undefined,
  status: AUTHENTICATION_STATUS.PENDING,
};
