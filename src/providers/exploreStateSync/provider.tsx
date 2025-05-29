import React, { ReactNode } from "react";
import { useMetaCommands } from "./hooks/UseMetaCommands/hook";

/**
 * Synchronizes the ExploreView component's state with the Next.js URL.
 *
 * Listens for reducer meta-commands (`STATE_TO_URL_PUSH`/`STATE_TO_URL_REPLACE`)
 * and updates the URL accordingly using router methods.
 *
 * Usage:
 * ```tsx
 * <ExploreStateProvider>
 *   <ExploreStateSyncProvider>
 *     <ExploreView />
 *   </ExploreStateSyncProvider>
 * </ExploreStateProvider>
 * ```
 */

export function ExploreStateSyncProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  // Meta-command related side effects.
  useMetaCommands();

  return <>{children}</>;
}
