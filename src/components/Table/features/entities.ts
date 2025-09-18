import { RowData } from "@tanstack/react-table";
import { RowPositionOptions, RowPositionRow } from "./RowPosition/types";
import {
  RowPreviewInstance,
  RowPreviewOptions,
  RowPreviewRow,
  RowPreviewTableState,
} from "./RowPreview/entities";
import {
  RowSelectionValidationOptions,
  RowSelectionValidationRow,
} from "./RowSelectionValidation/types";
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
    RowPreviewOptions,
    RowSelectionValidationOptions<T> {}

export interface CustomFeatureRow
  extends RowPositionRow,
    RowPreviewRow,
    RowSelectionValidationRow {}

export type CustomFeatureTableState = RowPreviewTableState;
