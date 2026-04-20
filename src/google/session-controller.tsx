import { Fragment, JSX, useEffect } from "react";
import { authComplete } from "../auth/dispatch/auth";
import { authenticationComplete } from "../auth/dispatch/authentication";
import { updateCredentials } from "../auth/dispatch/credentials";
import { useAuth } from "../auth/hooks/useAuth";
import { useAuthentication } from "../auth/hooks/useAuthentication";
import { useCredentials } from "../auth/hooks/useCredentials";
import { SessionControllerProps } from "./types";

/**
 * Google session controller.
 * Bridges Google OAuth token to auth contexts.
 * @param props - Session controller props.
 * @param props.children - Children components.
 * @param props.token - OAuth access token.
 * @returns session controller component.
 */
export function SessionController({
  children,
  token,
}: SessionControllerProps): JSX.Element {
  const { authDispatch } = useAuth();
  const {
    authenticationDispatch,
    authenticationState: { profile },
  } = useAuthentication();
  const { credentialsDispatch } = useCredentials();

  useEffect(() => {
    // Dispatch only when profile is available:
    // - Login errors are managed by the login service.
    // - Logout operations handle resetting credentials, authentication and auth state.
    if (!profile) return;
    credentialsDispatch?.(updateCredentials(token)); // Release credentials.
    authenticationDispatch?.(authenticationComplete()); // Authentication `status` is "SETTLED".
    authDispatch?.(authComplete({ isAuthenticated: true })); // Auth `status` is "SETTLED", and `isAuthenticated` is "true".
  }, [
    authDispatch,
    authenticationDispatch,
    credentialsDispatch,
    profile,
    token,
  ]);

  return <Fragment>{children}</Fragment>;
}
