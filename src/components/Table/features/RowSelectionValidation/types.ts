import { Row, RowData } from "@tanstack/react-table";

/**
 * Row selection validation options added to the TanStack table options.
 */
export interface RowSelectionValidationOptions<T extends RowData> {
  enableRowSelectionValidation?: boolean;
  getRowSelectionValidation?: (row: Row<T>) => string | undefined;
}

/**
 * Row selection validation API added to the TanStack row.
 */
export interface RowSelectionValidationRow {
  getSelectionValidation?: () => string | undefined;
}
