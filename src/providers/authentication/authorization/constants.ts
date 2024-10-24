import { AUTHORIZATION_STATUS, AuthorizationState } from "./types";

export const DEFAULT_AUTHORIZATION_STATE: AuthorizationState = {
  status: AUTHORIZATION_STATUS.PENDING,
};
