import { NextRouter } from "next/router";
import { Dispatch } from "react";
import { ROUTER_METHOD } from "../../providers/exploreState/actions/stateToUrl/types";
import { META_COMMAND } from "./hooks/UseMetaCommands/types";

export type ActionCreator<P, DispatchType> = [P] extends [void]
  ? () => DispatchType
  : (payload: P) => DispatchType;

/**
 * Payload for syncing state to the URL.
 */
export interface StateToUrlPayload {
  method: ROUTER_METHOD;
}

/**
 * Payload for syncing the URL to state.
 */
export interface UrlToStatePayload {
  query: NextRouter["query"];
}

/**
 * Action creators the state sync manager dispatches.
 */
export interface StateSyncManagerActions<Action> {
  clearMeta: ActionCreator<void, Action>;
  stateToUrl: ActionCreator<StateToUrlPayload, Action>;
  urlToState: ActionCreator<UrlToStatePayload, Action>;
}

/**
 * State the state sync manager reads.
 */
export interface StateSyncManagerContext {
  command: META_COMMAND | undefined;
  paramKeys: string[];
  query: NextRouter["query"];
}

/**
 * Props for the useStateSyncManager hook.
 */
export interface UseStateSyncManagerProps<Action> {
  actions: StateSyncManagerActions<Action>;
  dispatch: Dispatch<Action> | null;
  state: StateSyncManagerContext;
}
