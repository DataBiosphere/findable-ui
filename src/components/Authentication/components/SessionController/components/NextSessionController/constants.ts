import { SessionContextValue } from "next-auth/react";
import { AUTH_STATUS } from "../../../../../../providers/authentication/auth/types";
import { AUTHENTICATION_STATUS } from "../../../../../../providers/authentication/authentication/types";

export const AUTH_STATUS_MAP: Record<
  SessionContextValue["status"],
  AUTH_STATUS
> = {
  authenticated: AUTH_STATUS.SETTLED,
  loading: AUTH_STATUS.PENDING,
  unauthenticated: AUTH_STATUS.SETTLED,
};

export const AUTHENTICATION_STATUS_MAP: Record<
  SessionContextValue["status"],
  AUTHENTICATION_STATUS
> = {
  authenticated: AUTHENTICATION_STATUS.SETTLED,
  loading: AUTHENTICATION_STATUS.PENDING,
  unauthenticated: AUTHENTICATION_STATUS.SETTLED,
};
