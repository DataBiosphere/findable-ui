import { useSession } from "next-auth/react";
import React, { Fragment, useEffect } from "react";
import { updateAuthentication } from "../../../../../../providers/authentication/authentication/dispatch";
import { useAuthentication } from "../../../../../../providers/authentication/authentication/hook";
import { SessionControllerProps } from "./types";
import { mapAuthentication } from "./utils";

export function SessionController({
  children,
}: SessionControllerProps): JSX.Element {
  const { authenticationDispatch } = useAuthentication();
  const session = useSession();

  useEffect(() => {
    authenticationDispatch?.(updateAuthentication(mapAuthentication(session)));
  }, [authenticationDispatch, session]);

  return <Fragment>{children}</Fragment>;
}
