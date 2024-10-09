import {
  CredentialsState,
  RequestCredentialsPayload,
  RevokeCredentialsPayload,
} from "./types";

/**
 * Request credentials action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function requestCredentialsAction<C>(
  state: CredentialsState<C>,
  payload: RequestCredentialsPayload<C>
): CredentialsState<C> {
  return {
    ...state,
    credentials: payload,
  };
}

/**
 * Revoke credentials action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function revokeCredentialsAction<C>(
  state: CredentialsState<C>,
  payload: RevokeCredentialsPayload
): CredentialsState<C> {
  if (!payload.isSuccess) throw new Error("Failed to revoke credentials.");
  return {
    ...state,
    credentials: undefined,
  };
}
