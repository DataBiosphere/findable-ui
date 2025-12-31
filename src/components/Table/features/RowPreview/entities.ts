import { OnChangeFn, Row, RowData, Updater } from "@tanstack/react-table";

export interface RowPreviewInstance<T extends RowData> {
  getIsRowPreview: () => boolean /* Is row preview open */;
  getRowPreviewRow: () => Row<T> | undefined;
  resetRowPreview: () => void;
  setRowPreview: (updater: Updater<RowPreviewState>) => void;
  toggleRowPreview: () => void;
}

export interface RowPreviewOptions {
  enableRowPreview?: boolean;
  onRowPreviewChange?: OnChangeFn<RowPreviewState>;
}

export interface RowPreviewRow {
  getIsPreview: () => boolean /* Is row previewed */;
  togglePreview: () => void;
}

export type RowPreviewState = { [id: string]: boolean };

export interface RowPreviewTableState {
  rowPreview: RowPreviewState;
}
