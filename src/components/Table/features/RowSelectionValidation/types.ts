import { Row, RowData } from "@tanstack/react-table";

export interface RowSelectionValidationOptions<T extends RowData> {
  enableRowSelectionValidation?: boolean;
  getRowSelectionValidation?: (row: Row<T>) => string | undefined;
}

export interface RowSelectionValidationRow {
  getSelectionValidation?: () => string | undefined;
}
