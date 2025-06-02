import { Router } from "next/router";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { useOnPopState } from "../../../services/beforePopState/useOnPopState";
import { WasPopContext } from "./context";

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

    return () => {
      Router.events.off("routeChangeStart", onRouteChangeStart);
      Router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  return (
    <WasPopContext.Provider value={{ wasPop: wasPopRef.current }}>
      {children}
    </WasPopContext.Provider>
  );
}
