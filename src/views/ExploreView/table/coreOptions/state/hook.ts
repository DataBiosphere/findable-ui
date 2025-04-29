import {
  ColumnFiltersState,
  CoreOptions,
  PaginationState,
  RowData,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { getTableStatePagination } from "../../../../../components/Table/common/utils";
import { useExploreState } from "../../../../../hooks/useExploreState";

/**
 * Returns the CoreOptions table state for the table.
 * TODO(cc) - Update explore state with table state for each entity i.e. ColumnFiltersState and PaginationState.
 * @returns CoreOptions table state.
 */
export function useCoreOptionsState(): Pick<CoreOptions<RowData>, "state"> {
  const { exploreState } = useExploreState();
  const entityState = exploreState.entityPageState[exploreState.tabValue];
  const { filterState, paginationState, rowPreview } = exploreState;
  const { columnVisibility, grouping, rowSelection, sorting } = entityState;
  const { currentPage, pageSize } = paginationState;

  const columnFilters: ColumnFiltersState = useMemo(
    () =>
      filterState.map((filter) => ({
        id: filter.categoryKey,
        value: filter.value,
      })),
    [filterState]
  );

  const pagination: PaginationState = useMemo(
    () => getTableStatePagination(currentPage - 1, pageSize),
    [currentPage, pageSize]
  );

  return {
    state: {
      columnFilters,
      columnVisibility,
      grouping,
      pagination,
      rowPreview,
      rowSelection,
      sorting,
    },
  };
}
