import { DEFAULT_AUTH_STATE } from "../auth/constants/auth";
import { DEFAULT_AUTHENTICATION_STATE } from "../auth/constants/authentication";
import { AUTH_STATUS, AuthState } from "../auth/types/auth";
import {
  AUTHENTICATION_STATUS,
  AuthenticationState,
} from "../auth/types/authentication";

/**
 * Google provider ID.
 */
export const GOOGLE_SIGN_IN_PROVIDER_ID = "google";

/**
 * Initial auth state for Google Sign-In.
 * Status is settled because there's no initial session check.
 */
export const AUTH_STATE: AuthState = {
  ...DEFAULT_AUTH_STATE,
  status: AUTH_STATUS.SETTLED,
};

/**
 * Initial authentication state for Google Sign-In.
 * Status is settled because there's no initial session check.
 */
export const AUTHENTICATION_STATE: AuthenticationState = {
  ...DEFAULT_AUTHENTICATION_STATE,
  status: AUTHENTICATION_STATUS.SETTLED,
};
