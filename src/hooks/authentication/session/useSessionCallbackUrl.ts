import { useMemo } from "react";
import { useRouteRoot } from "../../useRouteRoot";
import { INACTIVITY_PARAM } from "./useSessionTimeout";

/**
 * Return value of the useSessionCallbackUrl hook.
 */
export interface UseSessionCallbackUrl {
  callbackUrl: string | undefined;
}

/**
 * Returns the URL to return to when the session times out: the root route with
 * the inactivity parameter set.
 * @returns The callback URL; undefined during server rendering.
 */
export const useSessionCallbackUrl = (): UseSessionCallbackUrl => {
  const route = useRouteRoot();
  const callbackUrl = useMemo(() => getUrl(route), [route]);
  return { callbackUrl };
};

/**
 * Returns the URL with the inactivity query parameter set to true.
 * @param url - URL.
 * @returns URL.
 */
function getUrl(url: string): string | undefined {
  if (typeof window === "undefined") return;
  const urlObj = new URL(url, window.location.origin);
  urlObj.searchParams.set(INACTIVITY_PARAM, "true");
  return urlObj.href;
}
