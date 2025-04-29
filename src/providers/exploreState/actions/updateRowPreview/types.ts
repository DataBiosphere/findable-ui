import { Updater } from "@tanstack/react-table";
import { RowPreviewState } from "../../../../components/Table/features/RowPreview/entities";
import { ExploreActionKind } from "../../../exploreState";

export type UpdateRowPreviewAction = {
  payload: UpdateRowPreviewPayload;
  type: ExploreActionKind.UpdateRowPreview;
};

export type UpdateRowPreviewPayload = {
  updaterOrValue: Updater<RowPreviewState>;
};
