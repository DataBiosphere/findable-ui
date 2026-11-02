import { RowData, TableOptions } from "@tanstack/react-table";
import { useConfig } from "../../../hooks/useConfig";
import { useExpandedOptions } from "./expanded/hook";
import { useGroupingOptions } from "./grouping/hook";
import { useInitialState } from "./initialState/hook";
import { useSortingOptions } from "./sorting/hook";
import { useVisibilityOptions } from "./visibility/hook";

/**
 * Returns the table options for the current entity: the default options,
 * overridden by the entity's configured table options, with the initial state.
 * The table instance is reused across entities and TanStack merges new options
 * into the old ones, so options an entity may leave unset are passed explicitly
 * (undefined when unset) to clear the previous entity's value.
 * @returns Table options.
 */
export function useTableOptions<T extends RowData>(): Partial<TableOptions<T>> {
  const { entityConfig } = useConfig();
  const tableOptions = entityConfig.list.tableOptions;
  const expandedOptions = useExpandedOptions<T>();
  const groupingOptions = useGroupingOptions();
  const sortingOptions = useSortingOptions<T>();
  const visibilityOptions = useVisibilityOptions();
  const initialState = useInitialState<T>(tableOptions);
  return {
    ...expandedOptions,
    ...groupingOptions,
    ...sortingOptions, // TODO(cc) merge of all sorting options.
    ...visibilityOptions,
    ...tableOptions,
    columnVisibilityPresets: tableOptions?.columnVisibilityPresets,
    initialState,
  };
}
