import { clearPresetAction } from "./actions/clearPreset/action";
import { setPresetAction } from "./actions/setPreset/action";
import { ExploreViewAction, ExploreViewActionKind } from "./actions/types";
import { ExploreViewState } from "./types";

/**
 * Reducer for the ExploreView state.
 * Manages UI intent state such as preset selection (saved filters) per entity list.
 *
 * @param state - State.
 * @param action - Action.
 * @returns State.
 */
export function exploreViewReducer(
  state: ExploreViewState,
  action: ExploreViewAction,
): ExploreViewState {
  const { payload, type } = action;
  switch (type) {
    case ExploreViewActionKind.ClearPreset: {
      return clearPresetAction(state, payload);
    }
    case ExploreViewActionKind.SetPreset: {
      return setPresetAction(state, payload);
    }
    default: {
      return state;
    }
  }
}
