import { RowData, TableOptions } from "@tanstack/react-table";
import { Attribute } from "../../../../../common/entities";
import { useDataDictionaryState } from "../../../../../providers/dataDictionary/hooks/UseDataDictionaryState/hook";
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
  // Table state.
  const { dataDictionaryState } = useDataDictionaryState();
  const { columnFilters } = dataDictionaryState;

  // Column filters options.
  const columnFiltersOptions = useColumnFiltersOptions<T>();

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
