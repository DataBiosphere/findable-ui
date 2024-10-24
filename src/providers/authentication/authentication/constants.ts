import { AUTHENTICATION_STATUS, AuthenticationState } from "./types";

export const DEFAULT_AUTHENTICATION_STATE: AuthenticationState = {
  profile: undefined,
  status: AUTHENTICATION_STATUS.PENDING,
};
