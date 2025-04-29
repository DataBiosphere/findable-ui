import { TableContainer } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React, { Fragment, useEffect } from "react";
import { track } from "../../common/analytics/analytics";
import {
  EVENT_NAME,
  EVENT_PARAM,
  PAGINATION_DIRECTION,
} from "../../common/analytics/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../hooks/useBreakpointHelper";
import { useExploreMode } from "../../hooks/useExploreMode/useExploreMode";
import { useExploreState } from "../../hooks/useExploreState";
import { useScroll } from "../../hooks/useScroll";
import { ExploreActionKind } from "../../providers/exploreState";
import { DEFAULT_PAGINATION_STATE } from "../../providers/exploreState/initializer/constants";
import { TABLET } from "../../theme/common/breakpoints";
import { Loading, LOADING_PANEL_STYLE } from "../Loading/loading";
import { NoResults } from "../NoResults/noResults";
import { getColumnTrackSizing } from "../TableCreator/options/columnTrackSizing/utils";
import { ROW_DIRECTION } from "./common/entities";
import { buildCategoryViews, isClientFilteringEnabled } from "./common/utils";
import { Pagination as DXPagination } from "./components/Pagination/pagination";
import { TableBody } from "./components/TableBody/tableBody";
import { TableHead } from "./components/TableHead/tableHead";
import { TableToolbar } from "./components/TableToolbar/tableToolbar";
import { GridTable } from "./table.styles";
import { TableProps } from "./types";

export const TableComponent = <T extends RowData>({
  loading = false,
  listView,
  table,
}: TableProps<T>): JSX.Element => {
  const tabletDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, TABLET);
  const exploreMode = useExploreMode();
  const { exploreDispatch, exploreState } = useExploreState();
  const { filterState, listItems, paginationState } = exploreState;
  const { currentPage, pages, rows: pageCount } = paginationState;
  // const { disablePagination = false } = listView || {};
  const clientFiltering = isClientFilteringEnabled(exploreMode);
  const rowDirection = tabletDown
    ? ROW_DIRECTION.VERTICAL
    : ROW_DIRECTION.DEFAULT;

  const {
    getAllColumns,
    getRowModel,
    getState,
    getVisibleFlatColumns,
    nextPage: tableNextPage,
    previousPage: tablePreviousPage,
  } = table;

  const allColumns = getAllColumns();
  const { columnFilters } = getState();
  const { rows } = getRowModel();
  const noResults = !loading && (!rows || rows.length === 0);
  const scrollTop = useScroll();

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
      table.setColumnFilters(
        filterState.map(({ categoryKey, value }) => ({
          id: categoryKey,
          value,
        }))
      );
    }
  }, [clientFiltering, filterState, table]);

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
            pageSize: rows.filter(({ getIsGrouped }) => !getIsGrouped()).length,
            rows: rows.filter(({ getIsGrouped }) => !getIsGrouped()).length,
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
    rows,
  ]);

  function canNextPage(): boolean {
    return currentPage < pages;
  }

  function canPreviousPage(): boolean {
    return currentPage > 1;
  }

  return noResults ? (
    <NoResults Paper={null} title="No Results found" />
  ) : (
    <Fragment>
      <TableToolbar
        listView={listView}
        rowDirection={rowDirection}
        tableInstance={table}
      />
      <Loading
        appear={false}
        autoPosition={false}
        loading={loading}
        panelStyle={LOADING_PANEL_STYLE.INHERIT}
      />
      <TableContainer>
        <GridTable
          collapsable={true}
          gridTemplateColumns={getColumnTrackSizing(getVisibleFlatColumns())}
        >
          <TableHead rowDirection={rowDirection} tableInstance={table} />
          <TableBody
            rows={rows}
            rowDirection={rowDirection}
            tableInstance={table}
          />
        </GridTable>
      </TableContainer>
      {table.options.manualPagination && (
        <DXPagination
          canNextPage={canNextPage()}
          canPreviousPage={canPreviousPage()}
          currentPage={currentPage}
          onNextPage={handleTableNextPage}
          onPreviousPage={handleTablePreviousPage}
          totalPage={pages ?? 0}
        />
      )}
    </Fragment>
  );
};

// TODO(Dave) review whether memo is necessary - flash between tabs / loading state.
export const Table = React.memo(TableComponent) as typeof TableComponent;
