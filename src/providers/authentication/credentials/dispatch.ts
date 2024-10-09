import {
  CredentialsActionKind,
  RequestCredentialsAction,
  RequestCredentialsPayload,
  RevokeCredentialsAction,
  RevokeCredentialsPayload,
} from "./types";

/**
 * Request credentials action.
 * @param payload - Payload.
 * @returns Action.
 */
export function requestCredentials<C>(
  payload: RequestCredentialsPayload<C>
): RequestCredentialsAction<C> {
  return {
    payload,
    type: CredentialsActionKind.RequestCredentialsAction,
  };
}

/**
 * Revoke credentials action.
 * @param payload - Payload.
 * @returns Action.
 */
export function revokeCredentials(
  payload: RevokeCredentialsPayload
): RevokeCredentialsAction {
  return {
    payload,
    type: CredentialsActionKind.RevokeCredentialsAction,
  };
}
