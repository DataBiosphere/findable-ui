import { TableContainer } from "@mui/material";
import {
  ColumnDef,
  ColumnSort,
  CoreOptions,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  InitialTableState,
  RowData,
  RowSelectionState,
  TableState,
  Updater,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import React, { useCallback, useEffect, useMemo } from "react";
import { track } from "../../common/analytics/analytics";
import {
  EVENT_NAME,
  EVENT_PARAM,
  PAGINATION_DIRECTION,
  SORT_DIRECTION,
} from "../../common/analytics/entities";
import { ListConfig, ListViewConfig } from "../../config/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../hooks/useBreakpointHelper";
import { useExploreMode } from "../../hooks/useExploreMode";
import { useExploreState } from "../../hooks/useExploreState";
import { useScroll } from "../../hooks/useScroll";
import { ExploreActionKind } from "../../providers/exploreState";
import { DEFAULT_PAGINATION_STATE } from "../../providers/exploreState/initializer/constants";
import { TABLET } from "../../theme/common/breakpoints";
import { FluidPaper, GridPaper } from "../common/Paper/paper.styles";
import { NoResults } from "../NoResults/noResults";
import { ROW_DIRECTION } from "./common/entities";
import {
  buildCategoryViews,
  getFacetedUniqueValuesWithArrayValues,
  getGridTemplateColumns,
  getTableStatePagination,
  isClientFilteringEnabled,
} from "./common/utils";
import { Pagination as DXPagination } from "./components/Pagination/pagination";
import { TableBody } from "./components/TableBody/tableBody";
import { TableHead } from "./components/TableHead/tableHead";
import { TableToolbar } from "./components/TableToolbar/tableToolbar";
import { ROW_POSITION } from "./features/RowPosition/constants";
import { ROW_PREVIEW } from "./features/RowPreview/constants";
import { RowPreviewState } from "./features/RowPreview/entities";
import { GridTable } from "./table.styles";

export interface TableProps<T extends RowData> {
  columns: ColumnDef<T>[];
  getRowId?: CoreOptions<T>["getRowId"];
  initialState: InitialTableState;
  items: T[];
  listView?: ListViewConfig;
  loading?: boolean;
  tableOptions?: ListConfig<T>["tableOptions"];
}

/**
 * This table can be Controlled or Uncontrolled based on the set of props passed to it.
 * Controlled table will receive the navigation functions, and it will be used for dynamic loads.
 * Uncontrolled table will take advantage of React Table's state and will be used for static loads.
 * @param tableProps - Set of props required for displaying the table.
 * @param tableProps.columns - Set of columns to display.
 * @param tableProps.getRowId - Function to customize the row ID.
 * @param tableProps.initialState - Initial table state.
 * @param tableProps.items - Row data to display.
 * @param tableProps.listView - List view configuration.
 * @param tableProps.tableOptions - TanStack table options.
 * @returns Configured table element for display.
 */
export const TableComponent = <T extends RowData>({
  columns,
  getRowId,
  initialState,
  items,
  listView,
  tableOptions,
}: // eslint-disable-next-line sonarjs/cognitive-complexity -- TODO fix component length / complexity
TableProps<T>): JSX.Element => {
  const tabletDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, TABLET);
  const exploreMode = useExploreMode();
  const { exploreDispatch, exploreState } = useExploreState();
  const {
    entityPageState,
    filterState,
    listItems,
    loading,
    paginationState,
    rowPreview,
    tabValue,
  } = exploreState;
  const {
    columnsVisibility,
    enableRowSelection,
    grouping,
    rowSelection,
    sorting,
  } = entityPageState[tabValue];
  const { currentPage, pages, pageSize, rows: pageCount } = paginationState;
  const { disablePagination = false, enableRowPreview = false } =
    listView || {};
  const clientFiltering = isClientFilteringEnabled(exploreMode);
  const rowDirection = tabletDown
    ? ROW_DIRECTION.VERTICAL
    : ROW_DIRECTION.DEFAULT;
  const pagination = useMemo(
    () => getTableStatePagination(currentPage - 1, pageSize),
    [currentPage, pageSize]
  );

  const onSortingChange = (updater: Updater<ColumnSort[]>): void => {
    // TODO(cc) memoize `onSortingChange` with `useCallback`.
    // TODO(cc) copy `onSortingChange` to ../options/sorting/hook.ts see src/components/Table/options/grouping/hook.ts for example.
    exploreDispatch({
      payload: typeof updater === "function" ? updater(sorting) : updater,
      type: ExploreActionKind.UpdateSorting,
    });
    // Execute GTM tracking.
    // TODO(cc) update tracking to handle sorting of multiple columns.
    // TODO(cc) GTM tracking when `onSortingChange` is triggered only tracks the first column sorted, and takes the value from explore state which is not updated yet.
    track(EVENT_NAME.ENTITY_TABLE_SORTED, {
      [EVENT_PARAM.ENTITY_NAME]: exploreState.tabValue,
      [EVENT_PARAM.COLUMN_NAME]: sorting[0]?.id,
      [EVENT_PARAM.SORT_DIRECTION]: sorting[0]?.desc
        ? SORT_DIRECTION.DESC
        : SORT_DIRECTION.ASC,
    });
  };

  const onColumnVisibilityChange = (
    updater: Updater<VisibilityState>
  ): void => {
    // TODO(cc) memoize `onColumnVisibilityChange` with `useCallback`.
    exploreDispatch({
      payload:
        typeof updater === "function" ? updater(columnsVisibility) : updater,
      type: ExploreActionKind.UpdateColumnVisibility,
    });
  };

  const onRowPreviewChange = useCallback(
    (updater: Updater<RowPreviewState>): void => {
      exploreDispatch({
        payload: typeof updater === "function" ? updater(rowPreview) : updater,
        type: ExploreActionKind.UpdateRowPreview,
      });
    },
    [exploreDispatch, rowPreview]
  );

  const onRowSelectionChange = useCallback(
    (updater: Updater<RowSelectionState>): void => {
      exploreDispatch({
        payload:
          typeof updater === "function" ? updater(rowSelection) : updater,
        type: ExploreActionKind.UpdateRowSelection,
      });
    },
    [exploreDispatch, rowSelection]
  );

  const state: Partial<TableState> = {
    columnVisibility: columnsVisibility,
    grouping,
    pagination,
    rowPreview,
    rowSelection,
    sorting,
  };
  /**
   * TODO: Refactor `ListConfig` to follow the API patterns of the TanStack Table library.
   * TODO: Update `ColumnConfig` to follow the `ColumnDef` API of TanStack Table.
   * - Standardize column definitions to leverage the full power of TanStack Table's feature set and improve compatibility.
   * TODO: Deprecate the following properties:
   * - `defaultSort` in `ListConfig`: Replace this with TanStack Table's `tableOptions.initialState.sorting` feature.
   * - `columnVisible` in `ColumnConfig`: Replace this with TanStack Table's `tableOptions.initialState.columnVisibility` feature.
   * TODO: Define `columnVisibility` and `sorting` directly within `ListConfig` via the `tableOptions.initialState` property.
   * - This will simplify the configuration structure and centralize table state definitions, reducing redundancy and improving clarity.
   * - It will also allow for direct configuration of other TanStack Table options such as `columnOrder` via `tableOptions.initialState.columnOrder`.
   *
   * Current Workaround:
   * - The `initialState` property from `tableOptions` is destructured to separate it from other options. This allows the remaining properties in `tableOptions` to be passed directly to the TanStack Table configuration without breaking the current ListConfig `defaultSort` and `columnVisible` properties.
   */
  const { initialState: _initialState, ...restTableOptions } =
    tableOptions ?? {};
  const tableInstance = useReactTable({
    _features: [ROW_POSITION, ROW_PREVIEW],
    columns,
    data: items,
    enableColumnFilters: true, // client-side filtering.
    enableFilters: true, // client-side filtering.
    enableMultiSort: clientFiltering,
    enableRowPreview,
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: clientFiltering ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: clientFiltering
      ? getFacetedUniqueValuesWithArrayValues()
      : undefined,
    getFilteredRowModel: clientFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    getRowId,
    getSortedRowModel: clientFiltering ? getSortedRowModel() : undefined,
    initialState: { ...initialState, ..._initialState }, // `sorting` and `columnVisibility` are managed by the ExploreState.
    manualPagination: true,
    manualSorting: !clientFiltering,
    onColumnVisibilityChange,
    onRowPreviewChange,
    onRowSelectionChange,
    onSortingChange,
    pageCount,
    state,
    ...restTableOptions,
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

  // Sets react table column filters `columnFilters` state - for client-side filtering only - with update of filterState.
  useEffect(() => {
    if (clientFiltering) {
      tableInstance.setColumnFilters(
        filterState.map(({ categoryKey, value }) => ({
          id: categoryKey,
          value,
        }))
      );
    }
  }, [clientFiltering, filterState, tableInstance]);

  // Process explore response - client-side filtering only.
  useEffect(() => {
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
    listItems,
    results,
  ]);

  function canNextPage(): boolean {
    return currentPage < pages;
  }

  function canPreviousPage(): boolean {
    return currentPage > 1;
  }

  return noResults ? (
    <NoResults Paper={FluidPaper} title={"No Results found"} />
  ) : (
    <FluidPaper variant="table">
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
