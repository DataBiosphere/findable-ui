import { useState } from "react";
import { useBeforePopState } from "./hooks/UseBeforePopState/hook";
import { useMetaCommands } from "./hooks/UseMetaCommands/hook";
import { useStateSync } from "./hooks/UseStateSync/hook";
import { StateSyncManagerActions, UseStateSyncManagerProps } from "./types";

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
    () => actionCreators
  );

  // Register pop state related side effects.
  useBeforePopState();

  // Set up Meta-commands related side effects.
  useMetaCommands({ actions, dispatch, state });

  // Dispatch state <-> URL sync side effects.
  useStateSync({ actions, dispatch, state });
};
