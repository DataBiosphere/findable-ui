import {
  ColumnFiltersState,
  RowData,
  TableOptions,
} from "@tanstack/react-table";
import { useState } from "react";
import { Attribute } from "../../../../../common/entities";
import { useColumnFiltersOptions } from "./columnFilters/hook";
import { CORE_OPTIONS } from "./core/constants";
import { EXPANDED_OPTIONS } from "./expanded/constants";
import { FACETED_OPTIONS } from "./faceted/constants";
import { GROUPING_OPTIONS } from "./grouping/constants";
import { SORTING_OPTIONS } from "./sorting/constants";
import { VISIBILITY_OPTIONS } from "./visibility/constants";

export const useTableOptions = <T extends RowData = Attribute>(): Omit<
  TableOptions<T>,
  "columns" | "data" | "initialState"
> => {
  // Column filters state - to be moved to a provider with a reducer.
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Column filters options.
  const columnFiltersOptions = useColumnFiltersOptions<T>({ setColumnFilters });

  // Table options.
  return {
    ...columnFiltersOptions,
    ...CORE_OPTIONS,
    ...EXPANDED_OPTIONS,
    ...FACETED_OPTIONS,
    ...GROUPING_OPTIONS,
    ...SORTING_OPTIONS,
    ...VISIBILITY_OPTIONS,
    state: { columnFilters },
  } as TableOptions<T>;
};
