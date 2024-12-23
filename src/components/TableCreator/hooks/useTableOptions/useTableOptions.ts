import { RowData } from "@tanstack/react-table";
import { useConfig } from "../../../../hooks/useConfig";
import { useExpandedOptions } from "../../../Table/options/expanded/hook";
import { useGroupingOptions } from "../../../Table/options/grouping/hook";
import { useSortingOptions } from "../../../Table/options/sorting/hook";
import { UseTableOptions } from "./types";

export function useTableOptions<T extends RowData>(): UseTableOptions<T> {
  const {
    entityConfig: {
      list: { defaultSort, tableOptions },
    },
  } = useConfig();
  const expandedOptions = useExpandedOptions<T>();
  const groupingOptions = useGroupingOptions();
  const sortingOptions = useSortingOptions<T>();
  return {
    ...expandedOptions,
    ...groupingOptions,
    ...sortingOptions, // TODO(cc) merge of all sorting options.
    ...tableOptions,
    initialState: {
      ...tableOptions?.initialState,
      sorting: defaultSort
        ? [defaultSort] // TODO(cc) deprecate `defaultSort` in favor of `initialState.sorting`.
        : tableOptions?.initialState?.sorting,
    },
  };
}
