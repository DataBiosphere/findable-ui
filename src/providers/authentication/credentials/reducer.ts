import { requestCredentialsAction, revokeCredentialsAction } from "./actions";
import {
  CredentialsAction,
  CredentialsActionKind,
  CredentialsState,
} from "./types";

/**
 * Credentials reducer.
 * @param state - State.
 * @param action - Action.
 * @returns state.
 */
export function credentialsReducer<C>(
  state: CredentialsState<C>,
  action: CredentialsAction<C>
): CredentialsState<C> {
  const { payload, type } = action;
  switch (type) {
    case CredentialsActionKind.RequestCredentialsAction: {
      return requestCredentialsAction(state, payload);
    }
    case CredentialsActionKind.RevokeCredentialsAction: {
      return revokeCredentialsAction(state, payload);
    }
    default:
      return state;
  }
}
