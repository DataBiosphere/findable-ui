import { useEffect } from "react";
import { updateAuthState } from "../../../providers/authentication/auth/dispatch";
import {
  AUTH_STATUS,
  AuthContextProps,
  UpdateAuthStatePayload,
} from "../../../providers/authentication/auth/types";
import {
  AUTHENTICATION_STATUS,
  AuthenticationContextProps,
} from "../../../providers/authentication/authentication/types";

export const useSessionAuth = ({
  authenticationReducer,
  authReducer,
}: {
  authenticationReducer: AuthenticationContextProps;
  authReducer: Omit<AuthContextProps, "service">;
}): void => {
  const { authDispatch } = authReducer;
  const {
    authenticationState: { profile, status },
  } = authenticationReducer;
  const isAuthenticated = !!profile;

  useEffect(() => {
    authDispatch?.(
      updateAuthState(getSession(isAuthenticated, getSessionStatus(status)))
    );
  }, [authDispatch, isAuthenticated, status]);
};

/**
 * Returns the auth session based on the authentication state.
 * @param isAuthenticated - Authentication status.
 * @param status - Auth status.
 * @returns auth state payload.
 */
function getSession(
  isAuthenticated: boolean,
  status: AUTH_STATUS
): UpdateAuthStatePayload {
  switch (status) {
    case AUTH_STATUS.PENDING:
      return { isAuthenticated: false, status };
    case AUTH_STATUS.SETTLED:
      return { isAuthenticated, status };
    default:
      return { isAuthenticated: false, status };
  }
}

/**
 * Returns the session status based on the authentication status.
 * @param status - Authentication status.
 * @returns session status.
 */
function getSessionStatus(status: AUTHENTICATION_STATUS): AUTH_STATUS {
  if (status === AUTHENTICATION_STATUS.PENDING) return AUTH_STATUS.PENDING;
  return AUTH_STATUS.SETTLED;
}
