import { clearMetaAction } from "./actions/clearMeta/action";
import { stateToUrlAction } from "./actions/stateToUrl/action";
import { TablesAction, TablesActionKind } from "./actions/types";
import { updateColumnFiltersAction } from "./actions/updateColumnFilters/action";
import { urlToStateAction } from "./actions/urlToState/action";
import { TablesState } from "./state/types";

/**
 * Reducer for tables (the storing of table state, by key).
 * @param state - State.
 * @param action - Action.
 * @returns state.
 */
export function tablesReducer(
  state: TablesState,
  action: TablesAction,
): TablesState {
  const { payload, type } = action;
  switch (type) {
    case TablesActionKind.ClearMeta: {
      return clearMetaAction(state, payload);
    }
    case TablesActionKind.StateToUrl: {
      return stateToUrlAction(state, payload);
    }
    case TablesActionKind.UpdateColumnFilters: {
      return updateColumnFiltersAction(state, payload);
    }
    case TablesActionKind.UrlToState: {
      return urlToStateAction(state, payload);
    }
    default:
      return state;
  }
}
