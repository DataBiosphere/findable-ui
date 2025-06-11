import { DataDictionaryActionKind } from "../types";

export enum ROUTER_METHOD {
  PUSH = "push",
  REPLACE = "replace",
}

export type StateToUrlAction = {
  payload: StateToUrlPayload;
  type: DataDictionaryActionKind.StateToUrl;
};

export type StateToUrlPayload = {
  method: ROUTER_METHOD;
};
