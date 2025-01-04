import { Dispatch } from "react";
import { ProviderId } from "../common/types";

export type AuthAction =
  | RequestAuthAction
  | ResetStateAction
  | UpdateAuthStateAction;

export enum AuthActionKind {
  RequestAuth = "REQUEST_AUTH",
  ResetState = "RESET_STATE",
  UpdateAuthState = "UPDATE_AUTH_STATE",
}

export interface AuthContextProps {
  authDispatch: Dispatch<AuthAction> | null;
  authState: AuthState;
  service: Service | undefined;
}

export interface AuthState {
  initialState?: AuthState;
  isAuthenticated: boolean;
  status: AUTH_STATUS;
}

export type RequestAuthAction = {
  payload: RequestAuthPayload;
  type: AuthActionKind.RequestAuth;
};

export type RequestAuthPayload = undefined;

export type ResetStateAction = {
  payload: ResetStatePayload;
  type: AuthActionKind.ResetState;
};

export type ResetStatePayload = undefined;

export interface Service {
  [key: string]: unknown;
  requestLogin: (providerId: ProviderId) => void;
  requestLogout: (options?: {
    callbackUrl?: string;
    redirect?: boolean;
  }) => void;
}

export enum AUTH_STATUS {
  PENDING = "PENDING",
  SETTLED = "SETTLED",
}

export interface UpdateAuthStateAction {
  payload: UpdateAuthStatePayload;
  type: AuthActionKind.UpdateAuthState;
}

export interface UpdateAuthStatePayload {
  isAuthenticated?: boolean;
  status?: AUTH_STATUS;
}
