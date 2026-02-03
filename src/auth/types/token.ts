import { Dispatch } from "react";
import { ProviderId } from "./common";

/**
 * Token reset state action.
 */
export interface TokenResetStateAction {
  payload: TokenResetStatePayload;
  type: TokenActionKind.ResetState;
}

/**
 * Token reset state payload.
 */
export type TokenResetStatePayload = undefined;

/**
 * Token action type - union of all possible token actions.
 */
export type TokenAction = TokenResetStateAction | UpdateTokenAction;

/**
 * Token action kinds.
 */
export enum TokenActionKind {
  ResetState = "RESET_TOKEN",
  UpdateToken = "UPDATE_TOKEN",
}

/**
 * Token context properties.
 */
export interface TokenContextProps {
  tokenDispatch: Dispatch<TokenAction> | null;
  tokenState: TokenState;
}

/**
 * Token state.
 */
export interface TokenState {
  providerId: ProviderId | undefined;
  token: string | undefined;
}

/**
 * Update token action.
 */
export interface UpdateTokenAction {
  payload: UpdateTokenPayload;
  type: TokenActionKind.UpdateToken;
}

/**
 * Update token payload.
 */
export interface UpdateTokenPayload {
  providerId: ProviderId | undefined;
  token: string | undefined;
}
