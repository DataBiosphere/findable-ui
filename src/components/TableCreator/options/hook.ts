import { RowData, TableOptions } from "@tanstack/react-table";
import { useConfig } from "../../../hooks/useConfig";
import { useExpandedOptions } from "./expanded/hook";
import { useGroupingOptions } from "./grouping/hook";
import { useRowSelectionOptions } from "./rowSelection/hook";
import { useSortingOptions } from "./sorting/hook";

export function useTableOptions<T extends RowData>(): Partial<TableOptions<T>> {
  const {
    entityConfig: {
      list: { defaultSort, tableOptions },
    },
  } = useConfig();
  const expandedOptions = useExpandedOptions<T>();
  const groupingOptions = useGroupingOptions();
  const rowSelectionOptions = useRowSelectionOptions<T>();
  const sortingOptions = useSortingOptions<T>();
  return {
    ...expandedOptions,
    ...groupingOptions,
    ...rowSelectionOptions,
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
