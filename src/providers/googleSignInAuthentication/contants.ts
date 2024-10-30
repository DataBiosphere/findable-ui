import { DEFAULT_AUTH_STATE } from "../authentication/auth/constants";
import { AUTH_STATUS, AuthState } from "../authentication/auth/types";
import { DEFAULT_AUTHENTICATION_STATE } from "../authentication/authentication/constants";
import {
  AUTHENTICATION_STATUS,
  AuthenticationState,
} from "../authentication/authentication/types";

export const AUTH_STATE: AuthState = {
  ...DEFAULT_AUTH_STATE,
  status: AUTH_STATUS.DONE,
};

export const AUTHENTICATION_STATE: AuthenticationState = {
  ...DEFAULT_AUTHENTICATION_STATE,
  status: AUTHENTICATION_STATUS.DONE,
};
