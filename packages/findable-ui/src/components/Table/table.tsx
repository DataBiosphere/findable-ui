import {
  AlertTitle,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import {
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  InitialTableState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import { Pagination } from "../../common/entities";
import { useExploreState } from "../../hooks/useExploreState";
import { useScroll } from "../../hooks/useScroll";
import { EntityView, ExploreActionKind } from "../../providers/exploreState";
import { GridPaper, RoundedPaper } from "../common/Paper/paper.styles";
import { NoResults } from "../NoResults/noResults";
import {
  buildCategoryViews,
  getEditColumnOptions,
  getFacetedUniqueValuesWithArrayValues,
  getGridTemplateColumns,
  getTableSortLabelProps,
} from "./common/utils";
import { CheckboxMenu } from "./components/CheckboxMenu/checkboxMenu";
import { EntityViewToggle } from "./components/EntityViewToggle/entityViewToggle";
import { Pagination as DXPagination } from "./components/Pagination/pagination";
import { PaginationSummary } from "./components/PaginationSummary/paginationSummary";
import { Alert, Table as GridTable, TableToolbar } from "./table.styles";

export interface TableProps<T extends object> {
  columns: ColumnDef<T>[];
  count?: number;
  disablePagination?: boolean;
  initialState: InitialTableState;
  items: T[];
  loading?: boolean;
  pages?: number;
  pageSize: number;
  pagination?: Pagination;
  staticallyLoaded?: boolean;
  total?: number;
}

/**
 * This table can be Controlled or Uncontrolled based on the set of props passed to it.
 * Controlled table will receive the navigation functions, and it will be used for dynamic loads.
 * Uncontrolled table will take advantage of React Table's state and will be used for static loads.
 * @param tableProps - Set of props required for displaying the table.
 * @param tableProps.columns - Set of columns to display.
 * @param tableProps.disablePagination - Determine if the table shouldn't be paginated.
 * @param tableProps.initialState - Initial table state.
 * @param tableProps.items - Row data to display.
 * @param tableProps.total - Total number of rows in the result set.
 * @returns Configured table element for display.
 */
export const TableComponent = <T extends object>({
  columns,
  disablePagination,
  initialState,
  items,
  total,
}: // eslint-disable-next-line sonarjs/cognitive-complexity -- TODO fix component length / complexity
TableProps<T>): JSX.Element => {
  const { exploreDispatch, exploreState } = useExploreState();
  const {
    filterState,
    isRelatedView,
    listItems,
    listStaticLoad,
    loading,
    paginationState,
    relatedListItems,
    sorting,
  } = exploreState;
  const { currentPage, pages, pageSize, rows } = paginationState;
  const onSortingChange = (updater: Updater<ColumnSort[]>): void => {
    exploreDispatch({
      payload: typeof updater === "function" ? updater(sorting) : updater,
      type: ExploreActionKind.UpdateSorting,
    });
  };
  const state = {
    pagination: {
      pageIndex: 0,
      pageSize: disablePagination ? Number.MAX_SAFE_INTEGER : pageSize,
    },
    sorting,
  };
  const tableInstance = useReactTable({
    columns,
    data: items,
    enableColumnFilters: true, // listStaticLoad,
    enableFilters: true, // listStaticLoad,
    enableMultiSort: false,
    enableSorting: true, // listStaticLoad
    enableSortingRemoval: false, // listStaticLoad
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: listStaticLoad ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: listStaticLoad
      ? getFacetedUniqueValuesWithArrayValues()
      : undefined,
    getFilteredRowModel: listStaticLoad ? getFilteredRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: listStaticLoad ? getSortedRowModel() : undefined,
    initialState,
    manualPagination: listStaticLoad,
    manualSorting: !listStaticLoad,
    onSortingChange,
    pageCount: total,
    state,
  });
  const {
    getAllColumns,
    getHeaderGroups,
    getRowModel,
    getState,
    getVisibleFlatColumns,
    nextPage: tableNextPage,
    previousPage: tablePreviousPage,
    resetColumnVisibility,
  } = tableInstance;
  const allColumns = getAllColumns();
  const { columnFilters } = getState();
  const { rows: results } = getRowModel();
  const noResults = !loading && (!results || results.length === 0);
  const scrollTop = useScroll();
  const isLastPage = currentPage === pages;
  const editColumnOptions = getEditColumnOptions(tableInstance);
  const gridTemplateColumns = getGridTemplateColumns(getVisibleFlatColumns());

  const handleTableNextPage = (): void => {
    let nextPage = tableNextPage;
    if (!listStaticLoad) {
      nextPage = (): void => {
        exploreDispatch({
          payload: "next",
          type: ExploreActionKind.PaginateTable,
        });
      };
    }
    // const nextPage = pagination?.nextPage ?? tableNextPage;
    nextPage();
    scrollTop();
  };

  const handleTablePreviousPage = (): void => {
    //const previousPage = pagination?.previousPage ?? tablePreviousPage;
    let previousPage = tablePreviousPage;
    if (!listStaticLoad) {
      previousPage = (): void => {
        exploreDispatch({
          payload: "prev",
          type: ExploreActionKind.PaginateTable,
        });
      };
    }
    previousPage();
    scrollTop();
  };

  // Sets or resets react table column filters `columnFilters` state, for statically loaded api only, with update of filterState.
  // - `columnFilters` state is "cleared" for related view, and
  // - `columnFilters` state is "set" for all other views.
  useEffect(() => {
    if (listStaticLoad) {
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
  }, [filterState, isRelatedView, listStaticLoad, tableInstance]);

  // Builds categoryViews using react table `getFacetedUniqueValues`, for statically loaded api only, with update of columnFilters.
  useEffect(() => {
    if (!isRelatedView && listStaticLoad) {
      exploreDispatch({
        payload: {
          listItems,
          loading: false,
          paginationResponse: {
            nextIndex: null,
            pageSize: tableInstance.getFilteredRowModel().rows.length,
            pages: 1,
            previousIndex: null,
            rows: tableInstance.getFilteredRowModel().rows.length,
          },
          selectCategories: buildCategoryViews(allColumns, columnFilters),
        },
        type: ExploreActionKind.ProcessExploreResponse,
      });
    }
  }, [
    allColumns,
    columnFilters,
    exploreDispatch,
    isRelatedView,
    listItems,
    listStaticLoad,
    tableInstance,
  ]);

  // Unmount - reset entity view to "exact".
  useEffect(() => {
    return () => {
      exploreDispatch({
        payload: EntityView.EXACT,
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

  /**
   * Resets column visibility to default state.
   */
  const onResetColumnVisibility = (): void => {
    resetColumnVisibility(false);
  };

  return noResults ? (
    <NoResults title={"No Results found"} />
  ) : (
    <RoundedPaper>
      <GridPaper>
        {editColumnOptions && (
          <TableToolbar>
            {relatedListItems ? (
              <EntityViewToggle />
            ) : (
              <PaginationSummary
                firstResult={(currentPage - 1) * pageSize + 1}
                lastResult={isLastPage ? rows : pageSize * currentPage}
                totalResult={rows}
              />
            )}
            <CheckboxMenu
              label="Edit Columns"
              onReset={onResetColumnVisibility}
              options={editColumnOptions}
            />
          </TableToolbar>
        )}
        {isRelatedView && (
          <Alert severity="info" variant="banner">
            <AlertTitle>
              Dug has identified the following studies as mentioning the
              selected focus/disease or related term in the study description.
            </AlertTitle>
          </Alert>
        )}
        <TableContainer>
          <GridTable gridTemplateColumns={gridTemplateColumns}>
            {getHeaderGroups().map((headerGroup) => (
              <TableHead key={headerGroup.id}>
                <TableRow>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      <TableSortLabel
                        {...getTableSortLabelProps(header.column)}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            ))}
            <TableBody>
              {getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
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
    </RoundedPaper>
  );
};

// TODO(Dave) review whether memo is necessary - flash between tabs / loading state.
export const Table = React.memo(TableComponent) as typeof TableComponent;
//export const Table = TableComponent as typeof TableComponent;
