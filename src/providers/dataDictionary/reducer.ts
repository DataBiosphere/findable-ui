import {
  DataDictionaryAction,
  DataDictionaryActionKind,
} from "./actions/types";
import { updateColumnFiltersAction } from "./actions/updateColumnFilters/action";
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
  // eslint-disable-next-line sonarjs/no-small-switch -- expect additional cases.
  switch (type) {
    case DataDictionaryActionKind.UpdateColumnFilters: {
      return updateColumnFiltersAction(state, payload);
    }
    default:
      return state;
  }
}
