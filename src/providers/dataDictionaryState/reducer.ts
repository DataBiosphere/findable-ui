import { clearMetaAction } from "./actions/clearMeta/action";
import { stateToUrlAction } from "./actions/stateToUrl/action";
import {
  DataDictionaryAction,
  DataDictionaryActionKind,
} from "./actions/types";
import { updateColumnFiltersAction } from "./actions/updateColumnFilters/action";
import { urlToStateAction } from "./actions/urlToState/action";
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
    case DataDictionaryActionKind.StateToUrl: {
      return stateToUrlAction(state, payload);
    }
    case DataDictionaryActionKind.UpdateColumnFilters: {
      return updateColumnFiltersAction(state, payload);
    }
    case DataDictionaryActionKind.UrlToState: {
      return urlToStateAction(state, payload);
    }
    default:
      return state;
  }
}
