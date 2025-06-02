import React, { ReactNode, useCallback, useRef } from "react";
import { NextHistoryState } from "../../../services/beforePopState/types";
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
  const popRef = useRef<NextHistoryState | undefined>();

  // Pop callback.
  const onBeforePopState = useCallback((state: NextHistoryState) => {
    popRef.current = state;
    return true;
  }, []);

  // Clear pop ref.
  const onClearPopRef = useCallback(() => {
    popRef.current = undefined;
  }, []);

  // Register the callback to be invoked before pop.
  useOnPopState(onBeforePopState);

  return (
    <WasPopContext.Provider value={{ onClearPopRef, popRef }}>
      {children}
    </WasPopContext.Provider>
  );
}
