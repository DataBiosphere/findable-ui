import { useEffect } from "react";
import { updateAuthState } from "../../../providers/authentication/auth/dispatch";
import {
  AUTH_STATUS,
  AuthContextProps,
} from "../../../providers/authentication/auth/types";
import {
  AUTHENTICATION_STATUS,
  AuthenticationContextProps,
} from "../../../providers/authentication/authentication/types";
import {
  AUTHORIZATION_STATUS,
  AuthorizationContextProps,
} from "../../../providers/authentication/authorization/types";

export const useSessionAuth = ({
  authenticationReducer,
  authorizationReducer,
  authReducer,
}: {
  authenticationReducer: AuthenticationContextProps;
  authorizationReducer: AuthorizationContextProps;
  authReducer: Omit<AuthContextProps, "service">;
}): void => {
  const { authDispatch } = authReducer;
  const { authenticationState } = authenticationReducer;
  const { authorizationState } = authorizationReducer;
  const isAuthenticated = isSessionAuthenticated(authenticationState.status);
  const isAuthorized = isSessionAuthorized(authorizationState.status);
  const status = getSessionStatus(
    authenticationState.status,
    authorizationState.status
  );

  useEffect(() => {
    authDispatch?.(updateAuthState({ isAuthenticated, isAuthorized, status }));
  }, [authDispatch, isAuthenticated, isAuthorized, status]);
};

/**
 * Returns the session status based on the authentication and authorization status.
 * @param authenticationStatus - Authentication status.
 * @param authorizationStatus - Authorization status.
 * @returns session status.
 */
function getSessionStatus(
  authenticationStatus: AUTHENTICATION_STATUS,
  authorizationStatus: AUTHORIZATION_STATUS
): AUTH_STATUS {
  if (
    authenticationStatus === AUTHENTICATION_STATUS.PENDING ||
    authorizationStatus === AUTHORIZATION_STATUS.PENDING
  )
    return AUTH_STATUS.PENDING;
  return AUTH_STATUS.DONE;
}

/**
 * Returns true if the session is authenticated.
 * @param status - Authentication status.
 * @returns true if the session is authenticated.
 */
function isSessionAuthenticated(status: AUTHENTICATION_STATUS): boolean {
  return status === AUTHENTICATION_STATUS.AUTHENTICATED;
}

/**
 * Returns true if the session is authorized.
 * @param status - Authorization status.
 * @returns true if the session is authorized.
 */
function isSessionAuthorized(status: AUTHORIZATION_STATUS): boolean {
  return status === AUTHORIZATION_STATUS.AUTHORIZED;
}
