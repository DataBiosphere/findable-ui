import { useTables } from "../../../../providers/tables/hooks/UseTables/hook";
import { useStateSyncManager } from "../../../../hooks/stateSyncManager/hook";
import { clearMeta } from "../../../../providers/tables/actions/clearMeta/dispatch";
import { stateToUrl } from "../../../../providers/tables/actions/stateToUrl/dispatch";
import { urlToState } from "../../../../providers/tables/actions/urlToState/dispatch";
import { StateUrlAdapter } from "./adapter/types";
import { PARAM } from "./adapter/constants";

/**
 * Synchronizes table state with URL query parameters using a custom adapter.
 *
 * This hook sets up bidirectional synchronization between:
 * - Table state (filters, pagination, sorting)
 * - URL query parameters
 *
 * @param tableKey - Table identifier for table state management.
 * @param adapter - Adapter that handles URL <--> state conversion logic.
 */
export function useStateUrlSync(
  tableKey: string,
  adapter: StateUrlAdapter,
): void {
  const { dispatch, state } = useTables();

  useStateSyncManager({
    actions: {
      clearMeta,
      stateToUrl,
      urlToState: (payload) =>
        urlToState({
          tableKey,
          tableState: adapter.queryToState(payload.query),
        }),
    },
    dispatch,
    state: {
      command: state.meta?.command,
      paramKeys: [PARAM.FILTER],
      query: adapter.stateToQuery(state.tables[tableKey], tableKey),
    },
  });
}
