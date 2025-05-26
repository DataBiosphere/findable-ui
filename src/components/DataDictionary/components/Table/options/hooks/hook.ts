import { RowData, TableOptions } from "@tanstack/react-table";
import { useMemo } from "react";
import { Attribute } from "../../../../../../common/entities";
import { COLUMN_FILTERS_OPTIONS } from "../columnFilters";
import { CORE_OPTIONS } from "../core";
import { EXPANDED_OPTIONS } from "../expanded";
import { GROUPING_OPTIONS } from "../grouping";
import { SORTING_OPTIONS } from "../sorting";
import { VISIBILITY_OPTIONS } from "../visibility";

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
