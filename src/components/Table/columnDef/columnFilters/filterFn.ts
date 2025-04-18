import { Row, RowData } from "@tanstack/react-table";

/**
 * Returns true if the row should be included in the filtered rows.
 * The row will be included if:
 * - the column value (string) equals a value in the filter values array, or
 * - one of the column values is included in the filter values array.
 * See https://github.com/TanStack/table/blob/c895bda085d0886a7eba00a08019f377efbac54c/packages/table-core/src/filterFns.ts.
 * @param row - Row to filter.
 * @param columnId - Column identifier to retrieve the row's value.
 * @param filterValue - Filter value or values.
 * @returns True if the row should be included in the filtered rows.
 */
export function arrIncludesSome<T extends RowData>(
  row: Row<T>,
  columnId: string,
  filterValue: unknown[]
): boolean {
  return filterValue.some((val) => {
    const columnValue = row.getValue<unknown[]>(columnId);
    if (Array.isArray(columnValue)) {
      return columnValue?.includes(val);
    } else {
      return columnValue === val;
    }
  });
}
