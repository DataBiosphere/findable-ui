import {
  Cell,
  Column,
  Row,
  RowData,
  RowModel,
  Table,
  TableFeature,
  TableState,
} from "@tanstack/react-table";
import { InitialTableState } from "@tanstack/table-core/src/types";
import { getRowModel, getRowPosition, initInitialState } from "./utils";

export const ROW_POSITION: TableFeature = {
  createCell: <T extends RowData, TValue>(
    cell: Cell<T, TValue>,
    column: Column<T>,
    row: Row<T>,
    table: Table<T>
  ): void => {
    row.getRowPosition = (): number => {
      return getRowPosition(row.id, table);
    };
  },
  createTable: <T extends RowData>(table: Table<T>): void => {
    const originalGetRowModel = table.getRowModel.bind(table);
    table.getRowModel = (): RowModel<T> => {
      return getRowModel(table, originalGetRowModel);
    };
  },
  getInitialState: (initialState?: InitialTableState): Partial<TableState> => {
    return initInitialState(initialState);
  },
};
