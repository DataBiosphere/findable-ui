import { Updater, VisibilityState } from "@tanstack/react-table";
import { ExploreActionKind } from "../../../exploreState";

export type UpdateColumnVisibilityAction = {
  payload: UpdateColumnVisibilityPayload;
  type: ExploreActionKind.UpdateColumnVisibility;
};

export type UpdateColumnVisibilityPayload = {
  updaterOrValue: Updater<VisibilityState>;
};
