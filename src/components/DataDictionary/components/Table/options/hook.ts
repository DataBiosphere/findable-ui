import { RowData, TableOptions } from "@tanstack/react-table";
import { Attribute } from "../../../../../common/entities";
import { COLUMN_FILTERS_OPTIONS } from "./columnFilters/constants";
import { CORE_OPTIONS } from "./core/constants";
import { SORTING_OPTIONS } from "./sorting/constants";
import { VISIBILITY_OPTIONS } from "./visibility/constants";

export const useTableOptions = <T extends RowData = Attribute>(): Omit<
  TableOptions<T>,
  "columns" | "data"
> => {
  return {
    ...COLUMN_FILTERS_OPTIONS,
    ...CORE_OPTIONS,
    ...SORTING_OPTIONS,
    ...VISIBILITY_OPTIONS,
  };
};
