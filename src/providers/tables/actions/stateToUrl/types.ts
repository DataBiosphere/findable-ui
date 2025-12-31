import { TablesActionKind } from "../types";

export enum ROUTER_METHOD {
  PUSH = "push",
  REPLACE = "replace",
}

export type StateToUrlAction = {
  payload: StateToUrlPayload;
  type: TablesActionKind.StateToUrl;
};

export type StateToUrlPayload = {
  method: ROUTER_METHOD;
};
