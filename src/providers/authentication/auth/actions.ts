import { AuthState, UpdateAuthStatePayload } from "./types";

/**
 * Update auth state.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function updateAuthState(
  state: AuthState,
  payload: UpdateAuthStatePayload
): AuthState {
  return {
    ...state,
    ...payload,
  };
}
