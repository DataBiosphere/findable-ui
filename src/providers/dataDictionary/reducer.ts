import { clearMetaAction } from "./actions/clearMeta/action";
import { syncStateAndUrlAction } from "./actions/syncStateAndUrl/action";
import {
  DataDictionaryAction,
  DataDictionaryActionKind,
} from "./actions/types";
import { updateColumnFiltersAction } from "./actions/updateColumnFilters/action";
import { updateStateFromUrlAction } from "./actions/updateStateFromUrl/action";
import { DataDictionaryState } from "./types";

/**
 * Reducer for data dictionary.
 * @param state - State.
 * @param action - Action.
 * @returns state.
 */
export function dataDictionaryReducer(
  state: DataDictionaryState,
  action: DataDictionaryAction
): DataDictionaryState {
  const { payload, type } = action;
  switch (type) {
    case DataDictionaryActionKind.ClearMeta: {
      return clearMetaAction(state, payload);
    }
    case DataDictionaryActionKind.SyncStateAndUrl: {
      return syncStateAndUrlAction(state, payload);
    }
    case DataDictionaryActionKind.UpdateColumnFilters: {
      return updateColumnFiltersAction(state, payload);
    }
    case DataDictionaryActionKind.UpdateStateFromUrl: {
      return updateStateFromUrlAction(state, payload);
    }
    default:
      return state;
  }
}
