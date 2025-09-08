import { RowData } from "@tanstack/react-table";
import { RowPositionOptions, RowPositionRow } from "./RowPosition/types";
import {
  RowPreviewInstance,
  RowPreviewOptions,
  RowPreviewRow,
  RowPreviewTableState,
} from "./RowPreview/entities";
import {
  TableDownloadColumn,
  TableDownloadInstance,
  TableDownloadOptions,
} from "./TableDownload/types";

export type CustomFeatureColumn = TableDownloadColumn;

export interface CustomFeatureInstance<T extends RowData>
  extends TableDownloadInstance,
    RowPreviewInstance<T> {}

export type CustomFeatureInitialTableState = Partial<RowPreviewTableState>;

export interface CustomFeatureOptions<T extends RowData>
  extends TableDownloadOptions<T>,
    RowPositionOptions,
    RowPreviewOptions {}

export interface CustomFeatureRow extends RowPositionRow, RowPreviewRow {}

export type CustomFeatureTableState = RowPreviewTableState;
