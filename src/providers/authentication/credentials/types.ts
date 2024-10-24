import { Dispatch } from "react";

export type Credentials<C = string | undefined> = C;

export type CredentialsAction = ResetStateAction | UpdateCredentialsAction;

export enum CredentialsActionKind {
  ResetState = "RESET_STATE",
  UpdateCredentials = "STORE_CREDENTIALS",
}

export interface CredentialsContextProps {
  credentialsDispatch: Dispatch<CredentialsAction> | null;
  credentialsState: CredentialsState;
}

export interface CredentialsState {
  credentials: Credentials;
}

export type ResetStateAction = {
  payload: ResetStatePayload;
  type: CredentialsActionKind.ResetState;
};

export type ResetStatePayload = undefined;

export type UpdateCredentialsAction = {
  payload: UpdateCredentialsPayload;
  type: CredentialsActionKind.UpdateCredentials;
};

export type UpdateCredentialsPayload = Credentials;
