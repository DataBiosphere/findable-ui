import {
  ResetStateAction,
  TokenActionKind,
  UpdateTokenAction,
  UpdateTokenPayload,
} from "./types";

/**
 * Reset state action.
 * @returns Action.
 */
export function resetState(): ResetStateAction {
  return {
    payload: undefined,
    type: TokenActionKind.ResetState,
  };
}

/**
 * Update token action.
 * @param payload - Payload.
 * @returns Action.
 */
export function updateToken(payload: UpdateTokenPayload): UpdateTokenAction {
  return {
    payload,
    type: TokenActionKind.UpdateToken,
  };
}
