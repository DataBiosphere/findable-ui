import {
  ColumnFiltersOptions,
  RowData,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { arrIncludesSome } from "../../../../Table/columnDef/columnFilters/filterFn";

export const COLUMN_FILTERS_OPTIONS: Pick<
  ColumnFiltersOptions<RowData>,
  "enableColumnFilters" | "enableFilters" | "filterFns" | "getFilteredRowModel"
> = {
  enableColumnFilters: true,
  enableFilters: true,
  filterFns: { arrIncludesSome },
  getFilteredRowModel: getFilteredRowModel(),
};
