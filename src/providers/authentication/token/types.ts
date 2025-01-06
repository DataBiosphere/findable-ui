import { Dispatch } from "react";
import { ProviderId } from "../common/types";

export interface ResetStateAction {
  payload: ResetStatePayload;
  type: TokenActionKind.ResetState;
}

export type ResetStatePayload = undefined;

export type TokenAction = ResetStateAction | UpdateTokenAction;

export enum TokenActionKind {
  ResetState = "RESET_TOKEN",
  UpdateToken = "UPDATE_TOKEN",
}

export interface TokenContextProps {
  tokenDispatch: Dispatch<TokenAction> | null;
  tokenState: TokenState;
}

export interface TokenState {
  providerId: ProviderId | undefined;
  token: string | undefined;
}

export interface UpdateTokenAction {
  payload: UpdateTokenPayload;
  type: TokenActionKind.UpdateToken;
}

export interface UpdateTokenPayload {
  providerId: ProviderId | undefined;
  token: string | undefined;
}
