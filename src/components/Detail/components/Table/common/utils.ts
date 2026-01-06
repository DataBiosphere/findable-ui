import { ColumnDef, RowData } from "@tanstack/react-table";

/**
 * Generates columns from column definitions with meta associated with the column.
 * @param columns - Column configuration.
 * @returns generated column definitions.
 */
export function generateColumnDefinitions<T extends RowData>(
  columns: ColumnDef<T>[],
): ColumnDef<T>[] {
  return columns.map((column) => {
    return {
      ...column,
      meta: {
        ...column.meta,
        header: column.meta?.header ?? (column.header as string),
      },
    };
  });
}
