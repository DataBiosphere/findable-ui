import { Dispatch } from "react";

export enum AUTHENTICATION_STATUS {
  AUTHENTICATED = "AUTHENTICATED",
  PENDING = "PENDING",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}

export type AuthenticationAction =
  | RequestAuthenticationAction
  | ResetStateAction
  | UpdateAuthenticationAction;

export enum AuthenticationActionKind {
  RequestAuthentication = "REQUEST_AUTHENTICATION",
  ResetState = "RESET_STATE",
  UpdateAuthentication = "UPDATE_AUTHENTICATION",
}

export interface AuthenticationContextProps {
  authenticationDispatch: Dispatch<AuthenticationAction> | null;
  authenticationState: AuthenticationState;
}

export interface AuthenticationState {
  initialState?: AuthenticationState;
  profile: Profile<UserProfile>;
  status: AUTHENTICATION_STATUS;
}

export interface BaseProfile {
  id?: string;
  name: string;
}

export type Profile<P extends BaseProfile> = P | undefined;

export type RequestAuthenticationAction = {
  payload: RequestAuthenticationPayload;
  type: AuthenticationActionKind.RequestAuthentication;
};

export type RequestAuthenticationPayload = undefined;

export type ResetStateAction = {
  payload: ResetStatePayload;
  type: AuthenticationActionKind.ResetState;
};

export type ResetStatePayload = undefined;

export type UpdateAuthenticationAction = {
  payload: UpdateAuthenticationPayload;
  type: AuthenticationActionKind.UpdateAuthentication;
};

export interface UpdateAuthenticationPayload {
  profile?: Profile<UserProfile>;
  status?: AUTHENTICATION_STATUS;
}

export interface UserProfile extends BaseProfile {
  email: string;
  image?: string;
}
