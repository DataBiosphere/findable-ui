import { useSession } from "next-auth/react";
import React, { Fragment, useEffect, useMemo } from "react";
import { updateAuthentication } from "../../../../providers/authentication/authentication/dispatch";
import { useAuthentication } from "../../../../providers/authentication/authentication/hook";
import { updateAuthorization } from "../../../../providers/authentication/authorization/dispatch";
import { useAuthorization } from "../../../../providers/authentication/authorization/hook";
import { SessionControllerProps } from "./types";
import { mapAuthentication, mapAuthorization } from "./utils";

export function SessionController({
  children,
}: SessionControllerProps): JSX.Element {
  const { authenticationDispatch } = useAuthentication();
  const { authorizationDispatch } = useAuthorization();
  const session = useSession();
  const authentication = useMemo(() => mapAuthentication(session), [session]);
  const authorization = useMemo(() => mapAuthorization(session), [session]);

  useEffect(() => {
    authenticationDispatch?.(updateAuthentication(authentication));
    authorizationDispatch?.(updateAuthorization(authorization));
  }, [
    authentication,
    authenticationDispatch,
    authorization,
    authorizationDispatch,
  ]);

  return <Fragment>{children}</Fragment>;
}
