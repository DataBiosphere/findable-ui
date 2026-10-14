import { RowData, Table } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { FILTER_SORT } from "../../../../../../../../common/filters/sort/config/types";
import { UseUpdateFilterSort } from "./types";
import { initFilterSort, isFilterSortEnabled } from "./utils";

/**
 * Manages the filter value sort for a TanStack table's column filters, initialised and enabled from the table meta's filter sort.
 * @param table - TanStack table instance.
 * @returns The filter sort, its change handler, and whether sorting is enabled.
 */
export const useUpdateFilterSort = <T extends RowData>(
  table: Table<T>,
): UseUpdateFilterSort => {
  const [filterSort, setFilterSort] = useState<FILTER_SORT>(
    initFilterSort(table),
  );

  const enabled = useMemo(() => isFilterSortEnabled(table), [table]);

  const onFilterSortChange = useCallback(
    (value: FILTER_SORT) => setFilterSort(value),
    [],
  );

  return { enabled, filterSort, onFilterSortChange };
};
