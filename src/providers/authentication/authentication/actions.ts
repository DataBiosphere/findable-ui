import { AuthenticationState, UpdateAuthenticationPayload } from "./types";

/**
 * Update authentication action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function updateAuthenticationAction(
  state: AuthenticationState,
  payload: UpdateAuthenticationPayload
): AuthenticationState {
  return {
    ...state,
    ...payload,
  };
}
