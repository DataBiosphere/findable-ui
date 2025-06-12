import { RowData, TableOptions } from "@tanstack/react-table";
import { Attribute } from "../../../../../common/entities";
import { useColumnFiltersOptions } from "./columnFilters/hook";
import { CORE_OPTIONS } from "./core/constants";
import { EXPANDED_OPTIONS } from "./expanded/constants";
import { FACETED_OPTIONS } from "./faceted/constants";
import { useGlobalFilterOptions } from "./globalFilter/hook";
import { GROUPING_OPTIONS } from "./grouping/constants";
import { PAGINATION_OPTIONS } from "./pagination/constants";
import { SORTING_OPTIONS } from "./sorting/constants";
import { VISIBILITY_OPTIONS } from "./visibility/constants";

export const useTableOptions = <T extends RowData = Attribute>(): Omit<
  TableOptions<T>,
  "columns" | "data" | "initialState"
> => {
  // Column filters options.
  const columnFiltersOptions = useColumnFiltersOptions<T>();

  // Global filter options.
  const globalFilterOptions = useGlobalFilterOptions<T>();

  // Table options.
  return {
    ...columnFiltersOptions,
    ...CORE_OPTIONS,
    ...EXPANDED_OPTIONS,
    ...FACETED_OPTIONS,
    ...globalFilterOptions,
    ...GROUPING_OPTIONS,
    ...PAGINATION_OPTIONS,
    ...SORTING_OPTIONS,
    ...VISIBILITY_OPTIONS,
  } as TableOptions<T>;
};
