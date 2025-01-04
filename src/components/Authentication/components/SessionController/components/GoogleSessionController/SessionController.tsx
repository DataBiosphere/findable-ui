import React, { Fragment, useEffect } from "react";
import { authComplete } from "../../../../../../providers/authentication/auth/dispatch";
import { useAuth } from "../../../../../../providers/authentication/auth/hook";
import { authenticationComplete } from "../../../../../../providers/authentication/authentication/dispatch";
import { useAuthentication } from "../../../../../../providers/authentication/authentication/hook";
import { updateCredentials } from "../../../../../../providers/authentication/credentials/dispatch";
import { useCredentials } from "../../../../../../providers/authentication/credentials/hook";
import { SessionControllerProps } from "./types";

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
    // - Logout operations handle resetting credentials and authentication state.
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
