import {
  AUTH_STATUS,
  AuthActionKind,
  AuthResetStateAction,
  RequestAuthAction,
  UpdateAuthStateAction,
  UpdateAuthStatePayload,
} from "../types/auth";

/**
 * Auth is complete.
 * @param payload - Payload.
 * @returns Action.
 */
export function authComplete(
  payload: UpdateAuthStatePayload,
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
export function resetAuthState(): AuthResetStateAction {
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
  payload: UpdateAuthStatePayload,
): UpdateAuthStateAction {
  return {
    payload,
    type: AuthActionKind.UpdateAuthState,
  };
}
