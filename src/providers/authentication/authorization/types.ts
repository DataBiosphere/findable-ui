import { Dispatch } from "react";

export enum AUTHORIZATION_STATUS {
  AUTHORIZED = "AUTHORIZED",
  PENDING = "PENDING",
  UNAUTHORIZED = "UNAUTHORIZED",
}

export type AuthorizationAction =
  | RequestAuthorizationAction
  | ResetStateAction
  | UpdateAuthorizationStatusAction;

export enum AuthorizationActionKind {
  RequestAuthorization = "REQUEST_AUTHORIZATION",
  ResetState = "RESET_STATE",
  UpdateAuthorizationStatus = "UPDATE_AUTHORIZATION_STATUS",
}

export interface AuthorizationContextProps {
  authorizationDispatch: Dispatch<AuthorizationAction> | null;
  authorizationState: AuthorizationState;
}

export interface AuthorizationState {
  initialState?: Partial<AuthorizationState>;
  status: AUTHORIZATION_STATUS;
}

export type RequestAuthorizationAction = {
  payload: RequestAuthorizationPayload;
  type: AuthorizationActionKind.RequestAuthorization;
};

export type RequestAuthorizationPayload = undefined;

export type ResetStateAction = {
  payload: ResetStatePayload;
  type: AuthorizationActionKind.ResetState;
};

export type ResetStatePayload = undefined;

export interface UpdateAuthorizationStatusAction {
  payload: UpdateAuthorizationStatusPayload;
  type: AuthorizationActionKind.UpdateAuthorizationStatus;
}

export type UpdateAuthorizationStatusPayload = AUTHORIZATION_STATUS;
