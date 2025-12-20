import { useState } from "react";
import { useBeforePopState } from "./hooks/UseBeforePopState/hook";
import { useMetaCommands } from "./hooks/UseMetaCommands/hook";
import { useStateSync } from "./hooks/UseStateSync/hook";
import { StateSyncManagerActions, UseStateSyncManagerProps } from "./types";

/**
 * Synchronizes state (e.g. explore state, data dictionary state) with browser URL query parameters.
 *
 * Keeps state and URL in sync by:
 * - Updating URL when state changes (push/replace).
 * - Updating state when URL changes (navigation).
 * - Handling browser history events (back/forward buttons).
 *
 * Internal components:
 * 1. Pop-State Manager - Manages browser navigation events.
 * 2. Meta-Command Handler - Processes URL update commands from state.
 * 3. State-URL Sync - Coordinates bidirectional synchronization.
 *
 * Required setup:
 * - Action creators for state/URL operations.
 * - State containing command flags, URL parameters, and sync configuration.
 */

export const useStateSyncManager = <Action>({
  actions: actionCreators,
  dispatch,
  state,
}: UseStateSyncManagerProps<Action>): void => {
  /**
   * Store action creators in state to maintain referential stability across renders.
   * This prevents unnecessary re-renders in hooks that depend on these actions
   * and ensures effect dependencies remain stable.
   */
  const [actions] = useState<StateSyncManagerActions<Action>>(
    () => actionCreators,
  );

  // Register pop state related side effects.
  useBeforePopState();

  // Set up Meta-commands related side effects.
  useMetaCommands({ actions, dispatch, state });

  // Dispatch state <-> URL sync side effects.
  useStateSync({ actions, dispatch, state });
};
