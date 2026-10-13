import { OnChangeFn, Row, RowData, Updater } from "@tanstack/react-table";

/**
 * Row preview API added to the TanStack table instance.
 */
export interface RowPreviewInstance<T extends RowData> {
  getIsRowPreview: () => boolean /* Is row preview open */;
  getRowPreviewRow: () => Row<T> | undefined;
  resetRowPreview: () => void;
  setRowPreview: (updater: Updater<RowPreviewState>) => void;
  toggleRowPreview: () => void;
}

/**
 * Row preview options added to the TanStack table options.
 */
export interface RowPreviewOptions {
  enableRowPreview?: boolean;
  onRowPreviewChange?: OnChangeFn<RowPreviewState>;
}

/**
 * Row preview API added to the TanStack row.
 */
export interface RowPreviewRow {
  getIsPreview: () => boolean /* Is row previewed */;
  togglePreview: () => void;
}

export type RowPreviewState = { [id: string]: boolean } | undefined;

/**
 * Row preview state added to the TanStack table state.
 */
export interface RowPreviewTableState {
  rowPreview: RowPreviewState;
}
