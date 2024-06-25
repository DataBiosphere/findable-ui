import {
  functionalUpdate,
  InitialTableState,
  makeStateUpdater,
  Row,
  RowData,
  Table,
  TableFeature,
  TableOptionsResolved,
  TableState,
  Updater,
} from "@tanstack/react-table";
import { RowPreviewState } from "./entities";
import { isRowPreview } from "./utils";

export const ROW_PREVIEW: TableFeature = {
  createRow: <T extends RowData>(row: Row<T>, table: Table<T>): void => {
    row.getIsPreview = (): boolean => {
      const { rowPreview } = table.getState();
      return isRowPreview(row, rowPreview);
    };
  },
  createTable: <T extends RowData>(table: Table<T>): void => {
    table.getPreviewRowData = (): RowData | undefined => {
      const { rowPreview } = table.getState();
      return rowPreview?.original;
    };
    table.resetRowPreview = (): void => {
      table.setRowPreview(undefined);
    };
    table.setRowPreview = (updater: Updater<RowPreviewState>): void => {
      const safeUpdater: Updater<RowPreviewState> = (old: RowPreviewState) => {
        return functionalUpdate(updater, old);
      };
      return table.options.onRowPreviewChange?.(safeUpdater);
    };
  },
  getDefaultOptions: <T extends RowData>(
    table: Table<T>
  ): Partial<TableOptionsResolved<T>> => {
    return {
      enableRowPreview: true,
      onRowPreviewChange: makeStateUpdater("rowPreview", table),
    };
  },
  getInitialState: (initialState?: InitialTableState): Partial<TableState> => {
    return {
      ...initialState,
      rowPreview: undefined,
    } as Partial<TableState>;
  },
};
