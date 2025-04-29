import { ColumnSort, Updater } from "@tanstack/react-table";
import { ExploreActionKind } from "../../../exploreState";

export type UpdateSortingAction = {
  payload: UpdateSortingPayload;
  type: ExploreActionKind.UpdateSorting;
};

export type UpdateSortingPayload = {
  updaterOrValue: Updater<ColumnSort[]>;
};
