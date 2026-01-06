import { updateCredentialsAction } from "./actions";
import { DEFAULT_CREDENTIALS_STATE } from "./constants";
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
export function credentialsReducer(
  state: CredentialsState,
  action: CredentialsAction,
): CredentialsState {
  const { payload, type } = action;
  switch (type) {
    case CredentialsActionKind.ResetState: {
      return DEFAULT_CREDENTIALS_STATE;
    }
    case CredentialsActionKind.UpdateCredentials: {
      return updateCredentialsAction(state, payload);
    }
    default:
      return state;
  }
}
