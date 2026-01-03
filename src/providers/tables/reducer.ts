import { clearMetaAction } from "./actions/clearMeta/action";
import { stateToUrlAction } from "./actions/stateToUrl/action";
import { TablesAction, TablesActionKind } from "./actions/types";
import { updateColumnFiltersAction } from "./actions/updateColumnFilters/action";
import { updatePaginationAction } from "./actions/updatePagination/action";
import { urlToStateAction } from "./actions/urlToState/action";
import { TablesState } from "./state/types";

/**
 * Tables Reducer
 *
 * This reducer is the single source of truth for table state across all views (e.g. projects, samples, files), including pagination, sorting, filtering.
 *
 * ---
 * ## Revision-aware pagination (critical)
 *
 * Pagination is revision-aware to prevent stale pagination state from being reused when the active dataset changes.
 *
 * A "revision" represents the current dataset lifecycle (for example, switching between entity list types).
 *
 * When the revision changes:
 * - Pagination stored in reducer state becomes *logically stale*
 * - Pagination must reset to page index 0 for the new dataset
 *
 * This reset cannot rely on async dispatch timing alone, because pagination updates
 * may immediately trigger server-side requests (including cursor-based pagination).
 *
 * ---
 * ## Reducer responsibility
 *
 * The reducer is responsible for resolving the *correct base pagination* when applying
 * pagination updates:
 *
 * - If a pagination update was computed under the current revision, reducer pagination
 *   state is used as the base.
 * - If a pagination update was computed under a previous revision, pagination is
 *   treated as reset (pageIndex = 0) before applying the update.
 *
 * This ensures that pagination updaters are always applied against the same logical
 * pagination state that was rendered to the user.
 *
 * ---
 * ## Invariant
 *
 * Pagination state used for reducer calculations must represent the same dataset
 * revision as the pagination state rendered by the UI.
 *
 * Violating this invariant will result in incorrect pagination math
 * (e.g. page jumps such as 0 → 4 instead of 0 → 1).
 *
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
    case TablesActionKind.UpdatePagination: {
      return updatePaginationAction(state, payload);
    }
    case TablesActionKind.UrlToState: {
      return urlToStateAction(state, payload);
    }
    default:
      return state;
  }
}
