import { useTables } from "../../../../providers/tables/hooks/UseTables/hook";
import { useStateSyncManager } from "../../../../hooks/stateSyncManager/hook";
import { clearMeta } from "../../../../providers/tables/actions/clearMeta/dispatch";
import { stateToUrl } from "../../../../providers/tables/actions/stateToUrl/dispatch";
import { urlToState } from "../../../../providers/tables/actions/urlToState/dispatch";
import { buildContext } from "./utils";

/**
 * Synchronizes table state with URL query parameters.
 *
 * This hook sets up bidirectional synchronization between:
 * - Table state (filters, pagination, sorting)
 * - URL query parameters
 *
 * @param entityListType - Entity identifier.
 */
export function useStateUrlSync(entityListType: string): void {
  const { dispatch, state } = useTables();

  useStateSyncManager({
    actions: {
      clearMeta,
      stateToUrl,
      urlToState: urlToState(entityListType),
    },
    dispatch,
    state: buildContext(state, entityListType),
  });
}
