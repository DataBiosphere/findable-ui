import { Row, RowData } from "@tanstack/react-table";

export interface RowSelectionValidationOptions<T extends RowData> {
  enableRowSelectionValidation?: (row: Row<T>) => string | undefined;
}

export interface RowSelectionValidationRow {
  getSelectionValidation: () => string | undefined;
}
