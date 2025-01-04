import {
  AUTH_STATUS,
  AuthActionKind,
  RequestAuthAction,
  ResetStateAction,
  UpdateAuthStateAction,
  UpdateAuthStatePayload,
} from "./types";

/**
 * Auth is complete.
 * @param payload - Payload.
 * @returns Action.
 */
export function authComplete(
  payload: UpdateAuthStatePayload
): UpdateAuthStateAction {
  return {
    payload: { ...payload, status: AUTH_STATUS.SETTLED },
    type: AuthActionKind.UpdateAuthState,
  };
}

/**
 * Request auth action.
 * @returns Action.
 */
export function requestAuth(): RequestAuthAction {
  return {
    payload: undefined,
    type: AuthActionKind.RequestAuth,
  };
}

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
