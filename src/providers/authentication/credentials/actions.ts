import { CredentialsState, UpdateCredentialsPayload } from "./types";

/**
 * Update credentials action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function updateCredentialsAction(
  state: CredentialsState,
  payload: UpdateCredentialsPayload,
): CredentialsState {
  return {
    ...state,
    credentials: payload,
  };
}
