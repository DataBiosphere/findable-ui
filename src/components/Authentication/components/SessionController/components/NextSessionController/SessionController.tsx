import { useSession } from "next-auth/react";
import React, { Fragment, useEffect } from "react";
import { updateAuthState } from "../../../../../../providers/authentication/auth/dispatch";
import { useAuth } from "../../../../../../providers/authentication/auth/hook";
import { updateAuthentication } from "../../../../../../providers/authentication/authentication/dispatch";
import { useAuthentication } from "../../../../../../providers/authentication/authentication/hook";
import { SessionControllerProps } from "./types";
import { mapAuth, mapAuthentication } from "./utils";

export function SessionController({
  children,
}: SessionControllerProps): JSX.Element {
  const { authDispatch } = useAuth();
  const { authenticationDispatch } = useAuthentication();
  const session = useSession();

  useEffect(() => {
    authDispatch?.(updateAuthState(mapAuth(session)));
    authenticationDispatch?.(updateAuthentication(mapAuthentication(session)));
  }, [authDispatch, authenticationDispatch, session]);

  return <Fragment>{children}</Fragment>;
}
