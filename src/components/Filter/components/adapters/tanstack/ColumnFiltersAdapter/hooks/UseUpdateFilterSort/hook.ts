import { RowData, Table } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { FILTER_SORT } from "../../../../../../../../common/filters/sort/config/types";
import { UseUpdateFilterSort } from "./types";
import { initFilterSort, isFilterSortEnabled } from "./utils";

export const useUpdateFilterSort = <T extends RowData>(
  table: Table<T>
): UseUpdateFilterSort => {
  const [filterSort, setFilterSort] = useState<FILTER_SORT>(
    initFilterSort(table)
  );

  const enabled = useMemo(() => isFilterSortEnabled(table), [table]);

  const onFilterSortChange = useCallback(
    (value: FILTER_SORT) => setFilterSort(value),
    []
  );

  return { enabled, filterSort, onFilterSortChange };
};
