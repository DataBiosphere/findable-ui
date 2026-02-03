import { DEFAULT_CREDENTIALS_STATE } from "../constants/credentials";
import {
  CredentialsAction,
  CredentialsActionKind,
  CredentialsState,
  UpdateCredentialsPayload,
} from "../types/credentials";

/**
 * Update credentials action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
function updateCredentialsAction(
  state: CredentialsState,
  payload: UpdateCredentialsPayload,
): CredentialsState {
  return {
    ...state,
    credentials: payload,
  };
}

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
