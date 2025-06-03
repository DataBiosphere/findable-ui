import { NextRouter } from "next/router";
import { Dispatch } from "react";
import { META_COMMAND } from "./hooks/UseMetaCommands/types";

export type ActionCreator<P, DispatchType> = (payload: P) => DispatchType;

export type ExtractActionByType<A, T extends string> = A extends { type: T }
  ? A
  : never;

export type ExtractPayloadFromAction<A> = A extends { payload: infer P }
  ? P
  : never;

export type PayloadForActionType<
  A,
  T extends string
> = ExtractPayloadFromAction<ExtractActionByType<A, T>>;

export type StateToUrlPayload<DispatchType> = PayloadForActionType<
  DispatchType,
  "STATE_TO_URL"
>;

export interface StateSyncManagerActions<DispatchType> {
  clearMeta: ActionCreator<void, DispatchType>;
  stateToUrl: ActionCreator<StateToUrlPayload<DispatchType>, DispatchType>;
  urlToState: ActionCreator<UrlToStatePayload<DispatchType>, DispatchType>;
}

export interface StateSyncManagerContext {
  command: META_COMMAND | undefined;
  paramKeys: string[];
  query: NextRouter["query"];
}

export type UrlToStatePayload<DispatchType> = PayloadForActionType<
  DispatchType,
  "URL_TO_STATE"
>;

export interface UseStateSyncManagerProps<DispatchType> {
  actions: StateSyncManagerActions<DispatchType>;
  dispatch: Dispatch<DispatchType>;
  state: StateSyncManagerContext;
}
