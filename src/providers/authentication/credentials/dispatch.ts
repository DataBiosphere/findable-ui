import {
  CredentialsActionKind,
  ResetStateAction,
  UpdateCredentialsAction,
  UpdateCredentialsPayload,
} from "./types";

/**
 * Update credentials action.
 * @returns Action.
 */
export function resetState(): ResetStateAction {
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
  payload: UpdateCredentialsPayload
): UpdateCredentialsAction {
  return {
    payload,
    type: CredentialsActionKind.UpdateCredentials,
  };
}
