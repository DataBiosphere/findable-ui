import { TableContainer } from "@mui/material";
import {
  ColumnDef,
  ColumnSort,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  InitialTableState,
  TableState,
  Updater,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import { track } from "../../common/analytics/analytics";
import {
  EVENT_NAME,
  EVENT_PARAM,
  PAGINATION_DIRECTION,
  SORT_DIRECTION,
} from "../../common/analytics/entities";
import { Pagination } from "../../common/entities";
import { ListViewConfig } from "../../config/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../hooks/useBreakpointHelper";
import { useExploreMode } from "../../hooks/useExploreMode";
import { useExploreState } from "../../hooks/useExploreState";
import { useScroll } from "../../hooks/useScroll";
import { ENTITY_VIEW, ExploreActionKind } from "../../providers/exploreState";
import { DEFAULT_PAGINATION_STATE } from "../../providers/exploreState/constants";
import { TABLET } from "../../theme/common/breakpoints";
import { FluidPaper, GridPaper } from "../common/Paper/paper.styles";
import { NoResults } from "../NoResults/noResults";
import { ROW_DIRECTION } from "./common/entities";
import {
  buildCategoryViews,
  getFacetedUniqueValuesWithArrayValues,
  getGridTemplateColumns,
  isClientFilteringEnabled,
} from "./common/utils";
import { Pagination as DXPagination } from "./components/Pagination/pagination";
import { TableBody } from "./components/TableBody/tableBody";
import { TableHead } from "./components/TableHead/tableHead";
import { TableToolbar } from "./components/TableToolbar/tableToolbar";
import { GridTable } from "./table.styles";

export interface TableProps<T extends object> {
  columns: ColumnDef<T>[];
  count?: number;
  initialState: InitialTableState;
  items: T[];
  listView?: ListViewConfig;
  loading?: boolean;
  pages?: number;
  pageSize: number;
  pagination?: Pagination;
  total?: number;
}

/**
 * This table can be Controlled or Uncontrolled based on the set of props passed to it.
 * Controlled table will receive the navigation functions, and it will be used for dynamic loads.
 * Uncontrolled table will take advantage of React Table's state and will be used for static loads.
 * @param tableProps - Set of props required for displaying the table.
 * @param tableProps.columns - Set of columns to display.
 * @param tableProps.initialState - Initial table state.
 * @param tableProps.items - Row data to display.
 * @param tableProps.listView - List view configuration.
 * @param tableProps.total - Total number of rows in the result set.
 * @returns Configured table element for display.
 */
export const TableComponent = <T extends object>({
  columns,
  initialState,
  items,
  listView,
  total,
}: // eslint-disable-next-line sonarjs/cognitive-complexity -- TODO fix component length / complexity
TableProps<T>): JSX.Element => {
  const tabletDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, TABLET);
  const exploreMode = useExploreMode();
  const { exploreDispatch, exploreState } = useExploreState();
  const {
    entityPageState,
    filterState,
    isRelatedView,
    listItems,
    loading,
    paginationState,
    tabValue,
  } = exploreState;
  const { columnsVisibility, sorting } = entityPageState[tabValue];
  const { currentPage, pages, pageSize } = paginationState;
  const { disablePagination = false } = listView || {};
  const clientFiltering = isClientFilteringEnabled(exploreMode);
  const rowDirection = tabletDown
    ? ROW_DIRECTION.VERTICAL
    : ROW_DIRECTION.DEFAULT;

  const onSortingChange = (updater: Updater<ColumnSort[]>): void => {
    exploreDispatch({
      payload: typeof updater === "function" ? updater(sorting) : updater,
      type: ExploreActionKind.UpdateSorting,
    });
    // Execute GTM tracking.
    track(EVENT_NAME.ENTITY_TABLE_SORTED, {
      [EVENT_PARAM.ENTITY_NAME]: exploreState.tabValue,
      [EVENT_PARAM.COLUMN_NAME]: sorting[0].id,
      [EVENT_PARAM.SORT_DIRECTION]: sorting[0].desc
        ? SORT_DIRECTION.DESC
        : SORT_DIRECTION.ASC,
    });
  };

  const onColumnVisibilityChange = (
    updater: Updater<VisibilityState>
  ): void => {
    exploreDispatch({
      payload:
        typeof updater === "function" ? updater(columnsVisibility) : updater,
      type: ExploreActionKind.UpdateColumnVisibility,
    });
  };

  const state: Partial<TableState> = {
    columnVisibility: columnsVisibility,
    pagination: {
      pageIndex: 0,
      pageSize: disablePagination ? Number.MAX_SAFE_INTEGER : pageSize,
    },
    sorting,
  };
  const tableInstance = useReactTable({
    columns,
    data: items,
    enableColumnFilters: true, // client-side filtering.
    enableFilters: true, // client-side filtering.
    enableMultiSort: false,
    enableSorting: true, // client-side filtering.
    enableSortingRemoval: false, // client-side filtering.
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: clientFiltering ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: clientFiltering
      ? getFacetedUniqueValuesWithArrayValues()
      : undefined,
    getFilteredRowModel: clientFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: clientFiltering ? getSortedRowModel() : undefined,
    initialState,
    manualPagination: clientFiltering,
    manualSorting: !clientFiltering,
    onColumnVisibilityChange,
    onSortingChange,
    pageCount: total,
    state,
  });
  const {
    getAllColumns,
    getRowModel,
    getState,
    getVisibleFlatColumns,
    nextPage: tableNextPage,
    previousPage: tablePreviousPage,
  } = tableInstance;
  const allColumns = getAllColumns();
  const { columnFilters } = getState();
  const { rows: results } = getRowModel();
  const noResults = !loading && (!results || results.length === 0);
  const scrollTop = useScroll();
  const visibleColumns = getVisibleFlatColumns();
  const gridTemplateColumns = getGridTemplateColumns(visibleColumns);

  const handleTableNextPage = (): void => {
    let nextPage = tableNextPage;
    if (!clientFiltering) {
      nextPage = (): void => {
        exploreDispatch({
          payload: "next",
          type: ExploreActionKind.PaginateTable,
        });
      };
      // Execute GTM tracking.
      track(EVENT_NAME.ENTITY_TABLE_PAGINATED, {
        [EVENT_PARAM.ENTITY_NAME]: exploreState.tabValue,
        [EVENT_PARAM.PAGINATION_DIRECTION]: PAGINATION_DIRECTION.NEXT,
      });
    }
    // const nextPage = pagination?.nextPage ?? tableNextPage;
    nextPage();
    scrollTop();
  };

  const handleTablePreviousPage = (): void => {
    let previousPage = tablePreviousPage;
    if (!clientFiltering) {
      previousPage = (): void => {
        exploreDispatch({
          payload: "prev",
          type: ExploreActionKind.PaginateTable,
        });
      };
      track(EVENT_NAME.ENTITY_TABLE_PAGINATED, {
        [EVENT_PARAM.ENTITY_NAME]: exploreState.tabValue,
        [EVENT_PARAM.PAGINATION_DIRECTION]: PAGINATION_DIRECTION.PREV,
      });
    }
    previousPage();
    scrollTop();
  };

  // Sets or resets react table column filters `columnFilters` state - for client-side filtering only - with update of filterState.
  // - `columnFilters` state is "cleared" for related view, and
  // - `columnFilters` state is "set" for all other views.
  useEffect(() => {
    if (clientFiltering) {
      if (isRelatedView) {
        tableInstance.resetColumnFilters();
      } else {
        tableInstance.setColumnFilters(
          filterState.map(({ categoryKey, value }) => ({
            id: categoryKey,
            value,
          }))
        );
      }
    }
  }, [clientFiltering, filterState, isRelatedView, tableInstance]);

  // Process explore response - client-side filtering only.
  useEffect(() => {
    if (isRelatedView) return;
    if (!listItems || listItems.length === 0) return;
    if (clientFiltering) {
      exploreDispatch({
        payload: {
          listItems,
          loading: false,
          paginationResponse: {
            ...DEFAULT_PAGINATION_STATE,
            pageSize: results.length,
            rows: results.length,
          },
          selectCategories: buildCategoryViews(allColumns, columnFilters),
        },
        type: ExploreActionKind.ProcessExploreResponse,
      });
    }
  }, [
    allColumns,
    clientFiltering,
    columnFilters,
    exploreDispatch,
    isRelatedView,
    listItems,
    results,
  ]);

  // Unmount - reset entity view to "exact".
  useEffect(() => {
    return () => {
      exploreDispatch({
        payload: ENTITY_VIEW.EXACT,
        type: ExploreActionKind.ToggleEntityView,
      });
    };
  }, [exploreDispatch]);

  function canNextPage(): boolean {
    return currentPage < pages;
  }

  function canPreviousPage(): boolean {
    return currentPage > 1;
  }

  return noResults ? (
    <NoResults Paper={FluidPaper} title={"No Results found"} />
  ) : (
    <FluidPaper>
      <GridPaper>
        <TableToolbar
          listView={listView}
          rowDirection={rowDirection}
          tableInstance={tableInstance}
        />
        <TableContainer>
          <GridTable
            collapsable={true}
            gridTemplateColumns={gridTemplateColumns}
          >
            <TableHead
              rowDirection={rowDirection}
              tableInstance={tableInstance}
            />
            <TableBody
              rowDirection={rowDirection}
              tableInstance={tableInstance}
            />
          </GridTable>
        </TableContainer>
        {!disablePagination && (
          <DXPagination
            canNextPage={canNextPage()}
            canPreviousPage={canPreviousPage()}
            currentPage={currentPage}
            onNextPage={handleTableNextPage}
            onPreviousPage={handleTablePreviousPage}
            totalPage={pages ?? 0}
          />
        )}
      </GridPaper>
    </FluidPaper>
  );
};

// TODO(Dave) review whether memo is necessary - flash between tabs / loading state.
export const Table = React.memo(TableComponent) as typeof TableComponent;
