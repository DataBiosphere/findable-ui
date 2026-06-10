import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { AUTH_STATUS, AuthState } from "../../../auth/types/auth";
import {
  AUTHENTICATION_STATUS,
  AuthenticationState,
} from "../../../auth/types/authentication";
import { escapeRegExp } from "../../../common/utils";
import { ROUTE } from "../../../routes/constants";
import { useRouteHistory } from "../../useRouteHistory";
import { INACTIVITY_PARAM } from "./useSessionTimeout";

export const useSessionActive = (
  authState: AuthState,
  authenticationState: AuthenticationState,
): void => {
  const { status: authStatus } = authState;
  const { status: authenticationStatus } = authenticationState;
  const { query } = useRouter();
  const { callbackUrl } = useRouteHistory(2);
  const isReady =
    authenticationStatus === AUTHENTICATION_STATUS.SETTLED &&
    authStatus === AUTH_STATUS.SETTLED;
  const queryCallbackUrl = getQueryCallbackUrl(query.callbackUrl);

  useEffect(() => {
    if (!isReady) return;
    Router.push(queryCallbackUrl ?? callbackUrl(transformRoute));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- queryCallbackUrl is intentionally omitted: this effect is a one-shot post-settle redirect, capturing the URL at first settle rather than re-firing each time the query changes.
  }, [callbackUrl, isReady]);
};

/**
 * Extracts a same-origin `callbackUrl` path from a Next.js router query value.
 * Next middleware (`withAuth`) appends `?callbackUrl=<original-path>` when it
 * redirects an unauthenticated request to the sign-in page; honoring this
 * keeps the consumer aligned with the standard NextAuth + middleware contract.
 *
 * Only accepts same-origin paths (must start with `/` and not `//`). Rejects
 * absolute URLs (`https://...`) and protocol-relative URLs (`//evil.com/x`,
 * which browsers treat as absolute) so the value can be safely passed to
 * `Router.push`, which does not perform its own same-origin filtering.
 *
 * @param value - Raw `callbackUrl` query value (string, string[], or undefined).
 * @returns The same-origin path, or `undefined` when missing or unsafe.
 */
export function getQueryCallbackUrl(
  value: string | string[] | undefined,
): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== "string" || raw.length === 0) return undefined;
  if (!raw.startsWith("/") || raw.startsWith("//")) return undefined;
  return raw;
}

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
      "",
    );
  }
}
