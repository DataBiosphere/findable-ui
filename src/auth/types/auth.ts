import { Dispatch } from "react";
import { ProviderId } from "./common";

/**
 * Auth action type - union of all possible auth actions.
 */
export type AuthAction =
  | RequestAuthAction
  | AuthResetStateAction
  | UpdateAuthStateAction;

/**
 * Auth action kinds.
 */
export enum AuthActionKind {
  RequestAuth = "REQUEST_AUTH",
  ResetState = "RESET_STATE",
  UpdateAuthState = "UPDATE_AUTH_STATE",
}

/**
 * Auth context properties.
 */
export interface AuthContextProps {
  authDispatch: Dispatch<AuthAction> | null;
  authState: AuthState;
  service: Service | undefined;
}

/**
 * Auth state.
 */
export interface AuthState {
  initialState?: AuthState;
  isAuthenticated: boolean;
  status: AUTH_STATUS;
}

/**
 * Request auth action.
 */
export type RequestAuthAction = {
  payload: RequestAuthPayload;
  type: AuthActionKind.RequestAuth;
};

/**
 * Request auth payload.
 */
export type RequestAuthPayload = undefined;

/**
 * Auth reset state action.
 */
export type AuthResetStateAction = {
  payload: AuthResetStatePayload;
  type: AuthActionKind.ResetState;
};

/**
 * Auth reset state payload.
 */
export type AuthResetStatePayload = undefined;

/**
 * Auth service interface.
 */
export interface Service {
  [key: string]: unknown;
  requestLogin: (providerId: ProviderId) => void;
  requestLogout: (options?: {
    callbackUrl?: string;
    redirect?: boolean;
  }) => void;
}

/**
 * Auth status enum.
 */
export enum AUTH_STATUS {
  PENDING = "PENDING",
  SETTLED = "SETTLED",
}

/**
 * Update auth state action.
 */
export interface UpdateAuthStateAction {
  payload: UpdateAuthStatePayload;
  type: AuthActionKind.UpdateAuthState;
}

/**
 * Update auth state payload.
 */
export interface UpdateAuthStatePayload {
  isAuthenticated?: boolean;
  status?: AUTH_STATUS;
}
