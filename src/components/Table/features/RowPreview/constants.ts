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
import {
  getIsPreview,
  getIsRowPreview,
  getRowPreviewRow,
  togglePreview,
  toggleRowPreview,
} from "./utils";

export const ROW_PREVIEW: TableFeature = {
  createRow: <T extends RowData>(row: Row<T>, table: Table<T>): void => {
    row.getIsPreview = (): boolean => {
      return getIsPreview(row, table);
    };
    row.togglePreview = (): void => {
      togglePreview(row, table);
    };
  },
  createTable: <T extends RowData>(table: Table<T>): void => {
    table.getIsRowPreview = (): boolean => {
      return getIsRowPreview(table);
    };
    table.getRowPreviewRow = (): Row<T> | undefined => {
      return getRowPreviewRow(table);
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
    table.toggleRowPreview = (): void => {
      toggleRowPreview(table);
    };
  },
  getDefaultOptions: <T extends RowData>(
    table: Table<T>
  ): Partial<TableOptionsResolved<T>> => {
    return {
      enableRowPreview: false,
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
