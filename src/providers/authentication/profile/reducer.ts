import { requestProfileAction, resetProfileAction } from "./actions";
import { ProfileAction, ProfileActionKind, ProfileState } from "./types";

/**
 * Profile reducer.
 * @param state - State.
 * @param action - Action.
 * @returns state.
 */
export function profileReducer<P>(
  state: ProfileState<P>,
  action: ProfileAction<P>
): ProfileState<P> {
  const { payload, type } = action;
  switch (type) {
    case ProfileActionKind.RequestProfileErrorAction: {
      return requestProfileAction(state, payload);
    }
    case ProfileActionKind.RequestProfileSuccessAction: {
      return requestProfileAction(state, payload);
    }
    case ProfileActionKind.ResetProfileAction: {
      return resetProfileAction(state, payload);
    }
    default:
      return state;
  }
}
