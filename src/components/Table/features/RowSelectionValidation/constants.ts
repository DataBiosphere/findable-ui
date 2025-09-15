import {
  Row,
  RowData,
  Table,
  TableFeature,
  TableOptionsResolved,
} from "@tanstack/react-table";
import { getSelectionValidation } from "./utils";

export const ROW_SELECTION_VALIDATION: TableFeature = {
  createRow: <T extends RowData>(row: Row<T>, table: Table<T>): void => {
    row.getSelectionValidation = (): string | undefined => {
      return getSelectionValidation(row, table);
    };
  },
  getDefaultOptions: <T extends RowData>(): Partial<
    TableOptionsResolved<T>
  > => {
    return {
      enableRowSelectionValidation: undefined,
    };
  },
};
