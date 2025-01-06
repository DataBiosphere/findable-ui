import { RowData } from "@tanstack/react-table";
import { RowPositionOptions, RowPositionRow } from "./RowPosition/types";
import {
  RowPreviewInstance,
  RowPreviewOptions,
  RowPreviewRow,
  RowPreviewTableState,
} from "./RowPreview/entities";

export type CustomFeatureInitialTableState = Partial<RowPreviewTableState>;
export type CustomFeatureInstance<T extends RowData> = RowPreviewInstance<T>;
export type CustomFeatureOptions = RowPreviewOptions & RowPositionOptions;
export type CustomFeatureRow = RowPositionRow & RowPreviewRow;
export type CustomFeatureTableState = RowPreviewTableState;
