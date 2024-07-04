import { RowData } from "@tanstack/react-table";
import {
  RowPreviewInstance,
  RowPreviewOptions,
  RowPreviewRow,
  RowPreviewTableState,
} from "./RowPreview/entities";

export type CustomFeatureInitialTableState = Partial<RowPreviewTableState>;
export type CustomFeatureInstance<T extends RowData> = RowPreviewInstance<T>;
export type CustomFeatureOptions = RowPreviewOptions;
export type CustomFeatureRow = RowPreviewRow;
export type CustomFeatureTableState = RowPreviewTableState;
