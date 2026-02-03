import {
  TokenActionKind,
  TokenResetStateAction,
  UpdateTokenAction,
  UpdateTokenPayload,
} from "../types/token";

/**
 * Reset token state action.
 * @returns Action.
 */
export function resetTokenState(): TokenResetStateAction {
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
