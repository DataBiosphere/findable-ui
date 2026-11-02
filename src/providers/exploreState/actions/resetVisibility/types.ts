import { ExploreActionKind } from "../../../exploreState";

export type ResetColumnVisibilityAction = {
  payload: ResetColumnVisibilityPayload;
  type: ExploreActionKind.ResetColumnVisibility;
};

export type ResetColumnVisibilityPayload = undefined;
