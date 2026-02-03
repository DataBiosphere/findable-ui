import { useSession } from "next-auth/react";
import { Fragment, JSX, useEffect } from "react";
import { updateAuthState } from "../auth/dispatch/auth";
import { updateAuthentication } from "../auth/dispatch/authentication";
import { useAuth } from "../auth/hooks/useAuth";
import { useAuthentication } from "../auth/hooks/useAuthentication";
import { SessionControllerProps } from "./types";
import { mapAuth, mapAuthentication } from "./utils";

/**
 * NextAuth session controller.
 * Bridges NextAuth session state to auth contexts.
 * @param props - Session controller props.
 * @param props.children - Children components.
 * @returns session controller component.
 */
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
