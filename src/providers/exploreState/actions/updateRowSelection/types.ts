import { RowSelectionState, Updater } from "@tanstack/react-table";
import { ExploreActionKind } from "../../../exploreState";

export type UpdateRowSelectionAction = {
  payload: UpdateRowSelectionPayload;
  type: ExploreActionKind.UpdateRowSelection;
};

export type UpdateRowSelectionPayload = {
  updaterOrValue: Updater<RowSelectionState>;
};
