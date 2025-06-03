import { ExploreActionKind } from "../../../exploreState";

export enum ROUTER_METHOD {
  PUSH = "push",
  REPLACE = "replace",
}

export type StateToUrlAction = {
  payload: StateToUrlPayload;
  type: ExploreActionKind.StateToUrl;
};

export type StateToUrlPayload = {
  method: ROUTER_METHOD;
};
