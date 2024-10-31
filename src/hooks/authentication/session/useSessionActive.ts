import Router from "next/router";
import { useEffect } from "react";
import { escapeRegExp } from "../../../common/utils";
import {
  AUTH_STATUS,
  AuthState,
} from "../../../providers/authentication/auth/types";
import { ROUTE } from "../../../routes/constants";
import { useRouteHistory } from "../../useRouteHistory";
import { INACTIVITY_PARAM } from "./useSessionTimeout";

export const useSessionActive = (authState: AuthState): void => {
  const { status } = authState;
  const { callbackUrl } = useRouteHistory(2);
  useEffect(() => {
    if (status !== AUTH_STATUS.DONE) return;
    Router.push(callbackUrl(transformRoute));
  }, [callbackUrl, status]);
};

/**
 * Finds the most recent route in the history that is not the login route and removes the inactivity timeout query parameter.
 * The inactivity timeout query parameter is appended to a URL to indicate that a session has expired. This function iterates
 * through the history of routes in reverse order, skipping any routes that lead to the login page, and returns the first route
 * that isn't the login route with the inactivity timeout parameter removed.
 * @param routes - An array of routes representing the navigation history, in order of navigation.
 * @returns The most recent valid route without the inactivity timeout parameter, or `undefined` if no such route is found.
 */
export function transformRoute(routes: string[]): string | undefined {
  for (const route of routes) {
    if (route === ROUTE.LOGIN) {
      continue;
    }
    return route?.replace(
      new RegExp(`\\?${escapeRegExp(INACTIVITY_PARAM)}(?:$|[=&].*)`),
      ""
    );
  }
}
