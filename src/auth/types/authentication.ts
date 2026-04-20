import { Dispatch } from "react";

/**
 * Authentication status enum.
 */
export enum AUTHENTICATION_STATUS {
  PENDING = "PENDING",
  SETTLED = "SETTLED",
}

/**
 * Authentication action type - union of all possible authentication actions.
 */
export type AuthenticationAction =
  | RequestAuthenticationAction
  | AuthenticationResetStateAction
  | UpdateAuthenticationAction;

/**
 * Authentication action kinds.
 */
export enum AuthenticationActionKind {
  RequestAuthentication = "REQUEST_AUTHENTICATION",
  ResetState = "RESET_STATE",
  UpdateAuthentication = "UPDATE_AUTHENTICATION",
}

/**
 * Authentication context properties.
 */
export interface AuthenticationContextProps {
  authenticationDispatch: Dispatch<AuthenticationAction> | null;
  authenticationState: AuthenticationState;
}

/**
 * Authentication state.
 */
export interface AuthenticationState {
  initialState?: AuthenticationState;
  profile: Profile<UserProfile>;
  status: AUTHENTICATION_STATUS;
}

/**
 * Base profile interface.
 */
export interface BaseProfile {
  id?: string;
  name: string;
}

/**
 * Profile type - can be undefined.
 */
export type Profile<P extends BaseProfile> = P | undefined;

/**
 * Request authentication action.
 */
export type RequestAuthenticationAction = {
  payload: RequestAuthenticationPayload;
  type: AuthenticationActionKind.RequestAuthentication;
};

/**
 * Request authentication payload.
 */
export type RequestAuthenticationPayload = undefined;

/**
 * Authentication reset state action.
 */
export type AuthenticationResetStateAction = {
  payload: AuthenticationResetStatePayload;
  type: AuthenticationActionKind.ResetState;
};

/**
 * Authentication reset state payload.
 */
export type AuthenticationResetStatePayload = undefined;

/**
 * Update authentication action.
 */
export type UpdateAuthenticationAction = {
  payload: UpdateAuthenticationPayload;
  type: AuthenticationActionKind.UpdateAuthentication;
};

/**
 * Update authentication payload.
 */
export interface UpdateAuthenticationPayload {
  profile?: Profile<UserProfile>;
  status?: AUTHENTICATION_STATUS;
}

/**
 * User profile interface.
 */
export interface UserProfile extends BaseProfile {
  email: string;
  image?: string;
}
