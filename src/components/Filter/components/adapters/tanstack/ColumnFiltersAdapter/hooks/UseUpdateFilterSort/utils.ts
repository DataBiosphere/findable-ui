import { RowData, Table } from "@tanstack/react-table";
import { FILTER_SORT } from "../../../../../../../../common/filters/sort/config/types";
import { getFilterSortConfig } from "../../utils";

/**
 * Returns the default filter sort type "ALPHA" or "COUNT" from table meta or ALPHA as fallback.
 * @param table - Table.
 * @returns default filter sort type.
 */
export function initFilterSort<T extends RowData>(
  table: Table<T>,
): FILTER_SORT {
  return getFilterSortConfig(table).sortBy || FILTER_SORT.ALPHA;
}

/**
 * Returns true if filter sort is enabled, i.e. the table meta sets a default filter sort.
 * @param table - Table.
 * @returns true if filter sort is enabled.
 */
export function isFilterSortEnabled<T extends RowData>(
  table: Table<T>,
): boolean {
  return Boolean(getFilterSortConfig(table).sortBy);
}
