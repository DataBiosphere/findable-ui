import Router, { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import { escapeRegExp } from "../../common/utils";
import { ROUTE_LOGIN } from "../../providers/authentication";
import { INACTIVITY_PARAM } from "../useSessionTimeout";
import { AUTHENTICATION_STATUS } from "./common/entities";

/**
 * Handles the completion of the authentication process.
 * @param authenticationStatus - Authentication status.
 */
export const useAuthenticationComplete = (
  authenticationStatus: AUTHENTICATION_STATUS
): void => {
  const { asPath } = useRouter();
  const routeHistoryRef = useRef<string>(initRouteHistory(asPath));

  // Maintain a history of routes that have been visited prior to authentication.
  routeHistoryRef.current = useMemo(
    () => updateRouteHistory(routeHistoryRef.current, asPath),
    [asPath]
  );

  // Redirect to the previous route after authentication is completed.
  useEffect(() => {
    if (authenticationStatus === AUTHENTICATION_STATUS.COMPLETED) {
      Router.push(routeHistoryRef.current);
    }
  }, [authenticationStatus]);
};

/**
 * Initializes route history with the current path.
 * Returns base path if current path is the login route.
 * @param path - current browser path.
 * @returns path to be used as the initial route history.
 */
function initRouteHistory(path: string): string {
  return path === ROUTE_LOGIN ? "/" : removeInactivityTimeoutQueryParam(path);
}

/**
 * Removes the inactivity timeout query parameter from the path.
 * the inactivity timeout parameter is used to indicate that the session has timed out; remove the parameter to
 * clear the session timeout banner after the user logs in again.
 * @param path - Path.
 * @returns path without the inactivity timeout query parameter.
 */
function removeInactivityTimeoutQueryParam(path: string): string {
  const regex = new RegExp(`\\?${escapeRegExp(INACTIVITY_PARAM)}(?:$|[=&].*)`);
  return path.replace(regex, "");
}

/**
 * Updates route history with the current path, unless the current path is the LoginView page.
 * @param prevPath - route history path.
 * @param path - current browser path.
 * @returns updated path to be used as the route history.
 */
function updateRouteHistory(prevPath: string, path: string): string {
  let currentPath = prevPath;
  if (path !== ROUTE_LOGIN) {
    currentPath = path;
  }
  return removeInactivityTimeoutQueryParam(currentPath);
}
