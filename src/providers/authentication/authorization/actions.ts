import { AuthorizationState, UpdateAuthorizationStatusPayload } from "./types";

/**
 * Update authorization status.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function updateAuthorizationStatus(
  state: AuthorizationState,
  payload: UpdateAuthorizationStatusPayload
): AuthorizationState {
  return {
    ...state,
    status: payload,
  };
}
