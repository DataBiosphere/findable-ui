import Router, { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useRouteRoot } from "./useRouteRoot";

const ROUTE_CHANGE_EVENT = "routeChangeComplete";
const MAX_HISTORY_LENGTH = 4;

export type TransformRouteFn = (routes: string[]) => string | undefined;

export interface UseRouteHistory {
  callbackUrl: (transformFn?: TransformRouteFn) => string;
}

export function useRouteHistory(
  maxHistory = MAX_HISTORY_LENGTH,
): UseRouteHistory {
  const { asPath } = useRouter();
  const rootPath = useRouteRoot();
  const historyRef = useRef<string[]>([asPath]);

  const onRouteChange = useCallback(
    (route: string): void => {
      if (route === historyRef.current[0]) return;
      historyRef.current.unshift(route);
      if (historyRef.current.length > maxHistory) {
        historyRef.current.pop();
      }
    },
    [maxHistory],
  );

  useEffect(() => {
    Router.events.on(ROUTE_CHANGE_EVENT, onRouteChange);
    return (): void => {
      Router.events.off(ROUTE_CHANGE_EVENT, onRouteChange);
    };
  }, [onRouteChange]);

  const callbackUrl = useCallback(
    (transformFn?: TransformRouteFn): string =>
      getCallbackUrl(historyRef.current, rootPath, transformFn),
    [rootPath],
  );

  return { callbackUrl };
}

/**
 * Generates a callback URL based on the provided history and root path.
 * Returns the callback URL determined by the transform function or the second item in history and if neither condition is met, returns the root path.
 * @param history - Navigation history.
 * @param rootPath - The default root path to return if no other conditions are met.
 * @param [transformFn] - An optional function that transforms the history array to a specific route.
 * @returns {string} - The callback UR.
 */
export function getCallbackUrl(
  history: string[],
  rootPath: string,
  transformFn?: TransformRouteFn,
): string {
  if (transformFn) {
    return transformFn(history) || rootPath;
  }
  return history[1] || rootPath;
}
