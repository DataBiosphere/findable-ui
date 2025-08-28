import { RowData, Table } from "@tanstack/react-table";
import { FILTER_SORT } from "../../../../../../../../common/filters/sort/config/types";
import { ColumnFiltersTableMeta } from "../../types";

/**
 * Returns the default filter sort type "ALPHA" or "COUNT" from table meta or ALPHA as fallback.
 * @param table - Table.
 * @returns default filter sort type.
 */
export function initFilterSort<T extends RowData>(
  table: Table<T>
): FILTER_SORT {
  const { options } = table;
  const { meta = {} } = options;
  const { filterSort } = meta as ColumnFiltersTableMeta<T>;

  return filterSort || FILTER_SORT.ALPHA;
}

/**
 * Returns true if filter sort is enabled.
 * @param table - Table.
 * @returns true if filter sort is enabled.
 */
export function isFilterSortEnabled<T extends RowData>(
  table: Table<T>
): boolean {
  const { options } = table;
  const { meta = {} } = options;
  const { filterSort } = meta as ColumnFiltersTableMeta<T>;

  return Boolean(filterSort);
}
