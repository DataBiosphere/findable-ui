import {
  ColumnFiltersOptions,
  RowData,
  getFilteredRowModel,
} from "@tanstack/react-table";

export const COLUMN_FILTERS_OPTIONS: Pick<
  ColumnFiltersOptions<RowData>,
  "enableColumnFilters" | "enableFilters" | "getFilteredRowModel"
> = {
  enableColumnFilters: true,
  enableFilters: true,
  getFilteredRowModel: getFilteredRowModel(),
};
