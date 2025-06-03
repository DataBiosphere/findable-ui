import { NextRouter } from "next/router";
import { Dispatch } from "react";
import { ROUTER_METHOD } from "../../providers/exploreState/actions/stateToUrl/types";
import { META_COMMAND } from "./hooks/UseMetaCommands/types";

export type ActionCreator<P, DispatchType> = [P] extends [void]
  ? () => DispatchType
  : (payload: P) => DispatchType;

export interface StateToUrlPayload {
  method: ROUTER_METHOD;
}

export interface UrlToStatePayload {
  query: NextRouter["query"];
}

export interface StateSyncManagerActions<Action> {
  clearMeta: ActionCreator<void, Action>;
  stateToUrl: ActionCreator<StateToUrlPayload, Action>;
  urlToState: ActionCreator<UrlToStatePayload, Action>;
}

export interface StateSyncManagerContext {
  command: META_COMMAND | undefined;
  paramKeys: string[];
  query: NextRouter["query"];
}

export interface UseStateSyncManagerProps<Action> {
  actions: StateSyncManagerActions<Action>;
  dispatch: Dispatch<Action>;
  state: StateSyncManagerContext;
}
