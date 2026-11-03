import { RowData } from "@tanstack/react-table";
import type { ColumnVisibilityResetOptions } from "../components/TableFeatures/ColumnVisibility/types";
import type {
  ColumnVisibilityPresetsInstance,
  ColumnVisibilityPresetsOptions,
} from "./ColumnVisibilityPresets/types";
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

/**
 * Custom feature APIs added to the TanStack table instance.
 */
export interface CustomFeatureInstance<T extends RowData>
  extends
    ColumnVisibilityPresetsInstance,
    TableDownloadInstance,
    RowPreviewInstance<T> {}

export type CustomFeatureInitialTableState = Partial<RowPreviewTableState>;

/**
 * Custom feature options added to the TanStack table options.
 */
export interface CustomFeatureOptions<T extends RowData>
  extends
    ColumnVisibilityPresetsOptions,
    ColumnVisibilityResetOptions,
    TableDownloadOptions<T>,
    RowPositionOptions,
    RowPreviewOptions,
    RowSelectionValidationOptions<T> {}

/**
 * Custom feature APIs added to the TanStack row.
 */
export interface CustomFeatureRow
  extends RowPositionRow, RowPreviewRow, RowSelectionValidationRow {}

export type CustomFeatureTableState = RowPreviewTableState;
