import {
  CredentialsActionKind,
  CredentialsResetStateAction,
  UpdateCredentialsAction,
  UpdateCredentialsPayload,
} from "../types/credentials";

/**
 * Reset credentials state action.
 * @returns Action.
 */
export function resetCredentialsState(): CredentialsResetStateAction {
  return {
    payload: undefined,
    type: CredentialsActionKind.ResetState,
  };
}

/**
 * Update credentials action.
 * @param payload - Payload.
 * @returns Action.
 */
export function updateCredentials(
  payload: UpdateCredentialsPayload,
): UpdateCredentialsAction {
  return {
    payload,
    type: CredentialsActionKind.UpdateCredentials,
  };
}
