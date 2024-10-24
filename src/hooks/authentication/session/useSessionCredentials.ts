import { useEffect } from "react";
import { AuthState } from "../../../providers/authentication/auth/types";
import { updateCredentials } from "../../../providers/authentication/credentials/dispatch";
import { CredentialsContextProps } from "../../../providers/authentication/credentials/types";
import { TokenContextProps } from "../../../providers/authentication/token/types";

/**
 * Hook for handling release of session credentials.
 * This hook monitors the authorization status of the session and
 * when successful, dispatches the local token to the credentials reducer.
 * @param authState - Auth state.
 * @param credentialsReducer - Credentials reducer.
 * @param tokenReducer - Token reducer.
 */

export const useSessionCredentials = (
  authState: AuthState,
  credentialsReducer: CredentialsContextProps,
  tokenReducer: TokenContextProps
): void => {
  const { isAuthorized } = authState;
  const { credentialsDispatch } = credentialsReducer;
  const {
    tokenState: { token: credentials },
  } = tokenReducer;

  useEffect(() => {
    if (!isAuthorized) return;
    credentialsDispatch?.(updateCredentials(credentials));
  }, [credentialsDispatch, isAuthorized, credentials]);
};
