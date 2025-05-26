import { RowData, TableOptions } from "@tanstack/react-table";
import { useMemo } from "react";
import { Attribute } from "../../../../../common/entities";
import { COLUMN_FILTERS_OPTIONS } from "./columnFilters/constants";
import { CORE_OPTIONS } from "./core/constants";
import { EXPANDED_OPTIONS } from "./expanded/constants";
import { GROUPING_OPTIONS } from "./grouping/constants";
import { SORTING_OPTIONS } from "./sorting/constants";
import { VISIBILITY_OPTIONS } from "./visibility/constants";

export const useTableOptions = <T extends RowData = Attribute>(): Omit<
  TableOptions<T>,
  "columns" | "data" | "initialState"
> => {
  return useMemo(
    () => ({
      ...COLUMN_FILTERS_OPTIONS,
      ...CORE_OPTIONS,
      ...EXPANDED_OPTIONS,
      ...GROUPING_OPTIONS,
      ...SORTING_OPTIONS,
      ...VISIBILITY_OPTIONS,
    }),
    []
  );
};
