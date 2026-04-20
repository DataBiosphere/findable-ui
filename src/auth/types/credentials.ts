import { Dispatch } from "react";

/**
 * Credentials type.
 */
export type Credentials<C = string | undefined> = C;

/**
 * Credentials action type - union of all possible credentials actions.
 */
export type CredentialsAction =
  | CredentialsResetStateAction
  | UpdateCredentialsAction;

/**
 * Credentials action kinds.
 */
export enum CredentialsActionKind {
  ResetState = "RESET_STATE",
  UpdateCredentials = "STORE_CREDENTIALS",
}

/**
 * Credentials context properties.
 */
export interface CredentialsContextProps {
  credentialsDispatch: Dispatch<CredentialsAction> | null;
  credentialsState: CredentialsState;
}

/**
 * Credentials state.
 */
export interface CredentialsState {
  credentials: Credentials;
}

/**
 * Credentials reset state action.
 */
export type CredentialsResetStateAction = {
  payload: CredentialsResetStatePayload;
  type: CredentialsActionKind.ResetState;
};

/**
 * Credentials reset state payload.
 */
export type CredentialsResetStatePayload = undefined;

/**
 * Update credentials action.
 */
export type UpdateCredentialsAction = {
  payload: UpdateCredentialsPayload;
  type: CredentialsActionKind.UpdateCredentials;
};

/**
 * Update credentials payload.
 */
export type UpdateCredentialsPayload = Credentials;
