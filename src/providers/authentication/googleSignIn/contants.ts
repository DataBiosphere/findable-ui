import { DEFAULT_AUTH_STATE } from "../auth/constants";
import { AUTH_STATUS, AuthState } from "../auth/types";
import { DEFAULT_AUTHENTICATION_STATE } from "../authentication/constants";
import {
  AUTHENTICATION_STATUS,
  AuthenticationState,
} from "../authentication/types";
import {
  AUTHORIZATION_STATUS,
  AuthorizationState,
} from "../authorization/types";

export const AUTH_STATE: AuthState = {
  ...DEFAULT_AUTH_STATE,
  status: AUTH_STATUS.DONE,
};

export const AUTHENTICATION_STATE: AuthenticationState = {
  ...DEFAULT_AUTHENTICATION_STATE,
  status: AUTHENTICATION_STATUS.UNAUTHENTICATED,
};

export const AUTHORIZATION_STATE: AuthorizationState = {
  status: AUTHORIZATION_STATUS.UNAUTHORIZED,
};
