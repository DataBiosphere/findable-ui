import { Router } from "next/router";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { useOnPopState } from "../../../services/beforePopState/useOnPopState";
import { WasPopContext } from "./context";

/**
 * WasPopProvider tracks browser navigation events to determine if the current route change
 * was triggered by a popstate event (browser back/forward navigation).
 *
 * This provider:
 * 1. Registers callbacks for route change events.
 * 2. Tracks when navigation occurs via browser back/forward buttons
 * 3. Provides this state via context to child components
 *
 * This allows components to respond differently to user-initiated navigation versus
 * browser history navigation.
 */

export function WasPopProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const wasPopRef = useRef<boolean>(false);

  const onBeforePopState = useCallback(() => {
    wasPopRef.current = true;
    return true;
  }, []);

  const onRouteChangeComplete = useCallback(() => {
    wasPopRef.current = false;
  }, []);

  const onRouteChangeStart = useCallback(() => {
    if (wasPopRef.current) return;
    wasPopRef.current = false;
  }, []);

  // Register the callback to be invoked before pop.
  useOnPopState(onBeforePopState);

  useEffect(() => {
    Router.events.on("routeChangeStart", onRouteChangeStart);
    Router.events.on("routeChangeComplete", onRouteChangeComplete);

    return (): void => {
      Router.events.off("routeChangeStart", onRouteChangeStart);
      Router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [onRouteChangeComplete, onRouteChangeStart]);

  return (
    <WasPopContext.Provider value={{ wasPop: wasPopRef.current }}>
      {children}
    </WasPopContext.Provider>
  );
}
