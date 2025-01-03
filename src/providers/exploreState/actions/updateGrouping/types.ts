import { GroupingState, Updater } from "@tanstack/react-table";
import { ExploreActionKind } from "../../../exploreState";

export type UpdateGroupingAction = {
  payload: UpdateGroupingPayload;
  type: ExploreActionKind.UpdateGrouping;
};

export type UpdateGroupingPayload = {
  updaterOrValue: Updater<GroupingState>;
};
