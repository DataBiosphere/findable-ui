import {
  FilterFnOption,
  GlobalFilterOptions,
  RowData,
} from "@tanstack/react-table";

export const GLOBAL_FILTER_OPTIONS: Pick<
  GlobalFilterOptions<RowData>,
  "enableGlobalFilter" | "getColumnCanGlobalFilter" | "globalFilterFn"
> = {
  enableGlobalFilter: true,
  getColumnCanGlobalFilter: () => true,
  globalFilterFn: "fuzzy" as FilterFnOption<RowData>,
};
