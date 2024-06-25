import { OnChangeFn, Row, RowData, Updater } from "@tanstack/react-table";

export interface RowPreviewInstance {
  getPreviewRowData: () => RowData | undefined;
  resetRowPreview: () => void;
  setRowPreview: (updater: Updater<RowPreviewState>) => void;
}

export interface RowPreviewOptions {
  enableRowPreview?: boolean;
  onRowPreviewChange?: OnChangeFn<RowPreviewState>;
}

export interface RowPreviewRow {
  getIsPreview: () => boolean;
}

export type RowPreviewState = Pick<Row<RowData>, "id" | "original"> | undefined;

export interface RowPreviewTableState {
  rowPreview: RowPreviewState;
}
