import Router, { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useRouteRoot } from "./useRouteRoot";

const ROUTE_CHANGE_EVENT = "routeChangeComplete";
const MAX_HISTORY_LENGTH = 4;

export type TransformRouteFn = (routes: string[]) => string | undefined;

export interface UseRouteHistory {
  callbackUrl: (transformFn?: TransformRouteFn) => string | undefined;
  goBack: (transformFn?: TransformRouteFn) => Promise<void>;
}

export function useRouteHistory(
  maxHistory = MAX_HISTORY_LENGTH
): UseRouteHistory {
  const { asPath } = useRouter();
  const rootPath = useRouteRoot();
  const historyRef = useRef<string[]>([asPath]);

  const onRouteChange = useCallback(
    (route: string): void => {
      if (route === getHistoryAt(historyRef.current, 0)) return;
      historyRef.current.unshift(route);
      if (historyRef.current.length > maxHistory) {
        historyRef.current.pop();
      }
    },
    [maxHistory]
  );

  useEffect(() => {
    Router.events.on(ROUTE_CHANGE_EVENT, onRouteChange);
    return (): void => {
      Router.events.off(ROUTE_CHANGE_EVENT, onRouteChange);
    };
  }, [onRouteChange]);

  const callbackUrl = useCallback(
    (transformFn?: TransformRouteFn): string | undefined => {
      if (transformFn) {
        return transformFn(historyRef.current) || rootPath;
      }
      return getHistoryAt(historyRef.current, 1) || rootPath;
    },
    [rootPath]
  );

  const goBack = useCallback(
    async (transformFn?: TransformRouteFn): Promise<void> => {
      const route =
        transformFn?.(historyRef.current) ||
        getHistoryAt(historyRef.current, 1);
      if (route) {
        await Router.push(route);
      } else {
        await Router.push(rootPath);
      }
    },
    [rootPath]
  );

  return { callbackUrl, goBack };
}

/**
 * Retrieves the route history entry at the specified index.
 * If the index is out of bounds or the history array is empty, it returns `undefined`.
 * @param history - The array of route history.
 * @param index - The index of the history entry to retrieve.
 * @returns The history entry at the given index, or `undefined` if the index is invalid.
 */
export function getHistoryAt(
  history: string[],
  index: number
): string | undefined {
  return history.at(index);
}
