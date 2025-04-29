import {
  ColumnFiltersOptions,
  getFilteredRowModel,
  RowData,
} from "@tanstack/react-table";
import { arrIncludesSome } from "../../../../../components/Table/columnDef/columnFilters/filterFn";
import { EXPLORE_MODE } from "../../../../../hooks/useExploreMode/types";

export const COLUMN_FILTERS: Record<
  EXPLORE_MODE,
  ColumnFiltersOptions<RowData>
> = {
  CS_FETCH_CS_FILTERING: {
    enableColumnFilters: true,
    enableFilters: true,
    filterFns: { arrIncludesSome },
    getFilteredRowModel: getFilteredRowModel(),
    manualFiltering: false,
  },
  SS_FETCH_CS_FILTERING: {
    enableColumnFilters: true,
    enableFilters: true,
    filterFns: { arrIncludesSome },
    getFilteredRowModel: getFilteredRowModel(),
    manualFiltering: false,
  },
  SS_FETCH_SS_FILTERING: {
    enableColumnFilters: false,
    enableFilters: false,
    getFilteredRowModel: undefined,
    manualFiltering: true,
    onColumnFiltersChange: undefined, // TODO!
  },
};
