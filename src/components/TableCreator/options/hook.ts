import { RowData, TableOptions } from "@tanstack/react-table";
import { useConfig } from "../../../hooks/useConfig";
import { ACCESSOR_KEYS } from "../common/constants";
import { useExpandedOptions } from "./expanded/hook";
import { useGroupingOptions } from "./grouping/hook";
import { useRowSelectionOptions } from "./rowSelection/hook";
import { useSortingOptions } from "./sorting/hook";
import { useVisibilityOptions } from "./visibility/hook";

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
  const visibilityOptions = useVisibilityOptions();
  return {
    ...expandedOptions,
    ...groupingOptions,
    ...rowSelectionOptions,
    ...sortingOptions, // TODO(cc) merge of all sorting options.
    ...visibilityOptions,
    ...tableOptions,
    initialState: {
      ...tableOptions?.initialState,
      columnVisibility: {
        [ACCESSOR_KEYS.ROW_POSITION]: false,
        [ACCESSOR_KEYS.SELECT]: false,
        ...tableOptions?.initialState?.columnVisibility,
      },
      sorting: defaultSort
        ? [defaultSort] // TODO(cc) deprecate `defaultSort` in favor of `initialState.sorting`.
        : tableOptions?.initialState?.sorting,
    },
  };
}
