import {
  AuthActionKind,
  ResetStateAction,
  UpdateAuthStateAction,
  UpdateAuthStatePayload,
} from "./types";

/**
 * Reset state action.
 * @returns state.
 */
export function resetState(): ResetStateAction {
  return {
    payload: undefined,
    type: AuthActionKind.ResetState,
  };
}

/**
 * Update auth state action.
 * @param payload - Payload.
 * @returns Action.
 */
export function updateAuthState(
  payload: UpdateAuthStatePayload
): UpdateAuthStateAction {
  return {
    payload,
    type: AuthActionKind.UpdateAuthState,
  };
}
