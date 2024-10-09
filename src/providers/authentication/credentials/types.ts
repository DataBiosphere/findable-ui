import { Dispatch, ReactNode } from "react";

export type Credentials<C> = C;

export type CredentialsAction<C> =
  | RequestCredentialsAction<C>
  | RevokeCredentialsAction;

export enum CredentialsActionKind {
  RequestCredentialsAction = "REQUEST_CREDENTIALS_ACTION",
  RevokeCredentialsAction = "REVOKE_CREDENTIALS_ACTION",
}

export interface CredentialsContextProps<C> {
  credentialsDispatch: Dispatch<CredentialsAction<C>> | null;
  credentialsState: CredentialsState<C>;
}

export interface CredentialsProviderProps {
  children: ReactNode | ReactNode[];
}

export interface CredentialsState<C> {
  credentials: Credentials<C> | undefined;
}

export type RequestCredentialsAction<C> = {
  payload: RequestCredentialsPayload<C>;
  type: CredentialsActionKind.RequestCredentialsAction;
};

export type RequestCredentialsPayload<C> = Credentials<C>;

export type RevokeCredentialsAction = {
  payload: RevokeCredentialsPayload;
  type: CredentialsActionKind.RevokeCredentialsAction;
};

export interface RevokeCredentialsPayload {
  isSuccess?: boolean;
}
