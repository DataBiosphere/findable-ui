import {
  AuthorizationActionKind,
  RequestAuthorizationAction,
  ResetStateAction,
  UpdateAuthorizationStatusAction,
  UpdateAuthorizationStatusPayload,
} from "./types";

/**
 * Request authorization action.
 * @returns state.
 */
export function requestAuthorization(): RequestAuthorizationAction {
  return {
    payload: undefined,
    type: AuthorizationActionKind.RequestAuthorization,
  };
}

/**
 * Reset state action.
 * @returns state.
 */
export function resetState(): ResetStateAction {
  return {
    payload: undefined,
    type: AuthorizationActionKind.ResetState,
  };
}

/**
 * Update authorization status action.
 * @param payload - Payload.
 * @returns Action.
 */
export function updateAuthorization(
  payload: UpdateAuthorizationStatusPayload
): UpdateAuthorizationStatusAction {
  return {
    payload,
    type: AuthorizationActionKind.UpdateAuthorizationStatus,
  };
}
