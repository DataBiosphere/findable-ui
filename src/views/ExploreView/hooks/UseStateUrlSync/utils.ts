import { StateSyncManagerContext } from "../../../../hooks/stateSyncManager/types";
import { TablesState } from "../../../../providers/tables/state/types";
import { PARAM } from "../../../../providers/tables/state/queries/constants";

/**
 * Builds context for URL-state synchronization.
 *
 * @param state - Tables state.
 * @param entityListType - Entity identifier.
 * @returns Context object with command, parameter keys, and query data.
 */
export function buildContext(
  state: TablesState,
  entityListType: string,
): StateSyncManagerContext {
  return {
    command: state.meta?.command,
    paramKeys: Object.values(PARAM),
    query: { ...state.queries[entityListType], entityListType },
  };
}
