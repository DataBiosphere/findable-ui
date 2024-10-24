import {
  AuthenticationActionKind,
  RequestAuthenticationAction,
  ResetStateAction,
  UpdateAuthenticationAction,
  UpdateAuthenticationPayload,
} from "./types";

/**
 * Request authentication action.
 * @returns Action.
 */
export function requestAuthentication(): RequestAuthenticationAction {
  return {
    payload: undefined,
    type: AuthenticationActionKind.RequestAuthentication,
  };
}

/**
 * Reset authentication action.
 * @returns Action.
 */
export function resetState(): ResetStateAction {
  return {
    payload: undefined,
    type: AuthenticationActionKind.ResetState,
  };
}

/**
 * Update authentication action.
 * @param payload - Payload.
 * @returns Action.
 */
export function updateAuthentication(
  payload: UpdateAuthenticationPayload
): UpdateAuthenticationAction {
  return {
    payload,
    type: AuthenticationActionKind.UpdateAuthentication,
  };
}
