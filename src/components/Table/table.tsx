import { TableContainer } from "@mui/material";
import { RowData, Table as TanStackTable } from "@tanstack/react-table";
import React, { Fragment, useCallback } from "react";
import { track } from "../../common/analytics/analytics";
import {
  EVENT_NAME,
  EVENT_PARAM,
  PAGINATION_DIRECTION,
} from "../../common/analytics/entities";
import { ListViewConfig } from "../../config/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../hooks/useBreakpointHelper";
import { useExploreMode } from "../../hooks/useExploreMode/useExploreMode";
import { useExploreState } from "../../hooks/useExploreState";
import { ExploreActionKind } from "../../providers/exploreState";
import { TABLET } from "../../theme/common/breakpoints";
import { Loading, LOADING_PANEL_STYLE } from "../Loading/loading";
import { NoResults } from "../NoResults/noResults";
import { getColumnTrackSizing } from "../TableCreator/options/columnTrackSizing/utils";
import { ROW_DIRECTION } from "./common/entities";
import { isClientFilteringEnabled } from "./common/utils";
import { TableBody } from "./components/TableBody/tableBody";
import { TableHead } from "./components/TableHead/tableHead";
import { TablePagination } from "./components/TablePagination/tablePagination";
import { TableToolbar } from "./components/TableToolbar/tableToolbar";
import { useVirtualization } from "./hooks/UseVirtualization/hook";
import { GridTable } from "./table.styles";

export interface TableProps<T extends RowData> {
  listView?: ListViewConfig;
  loading: boolean;
  table: TanStackTable<T>;
}

export const Table = <T extends RowData>({
  listView,
  loading,
  table,
}: TableProps<T>): JSX.Element => {
  const tabletDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, TABLET);
  const exploreMode = useExploreMode();
  const { exploreDispatch, exploreState } = useExploreState();
  const { paginationState } = exploreState;
  const { currentPage, pages } = paginationState;
  const { disablePagination = false } = listView || {};
  const clientFiltering = isClientFilteringEnabled(exploreMode);
  const rowDirection = tabletDown
    ? ROW_DIRECTION.VERTICAL
    : ROW_DIRECTION.DEFAULT;
  const { rows, scrollElementRef, virtualizer } = useVirtualization({
    rowDirection,
    table,
  });

  const {
    getVisibleFlatColumns,
    nextPage: tableNextPage,
    previousPage: tablePreviousPage,
  } = table;

  const noResults = !loading && (!rows || rows.length === 0);

  const handleTableNextPage = useCallback((): void => {
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
  }, [clientFiltering, exploreDispatch, exploreState, tableNextPage]);

  const handleTablePreviousPage = useCallback((): void => {
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
  }, [clientFiltering, exploreDispatch, exploreState, tablePreviousPage]);

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
      <TableToolbar listView={listView} tableInstance={table} />
      <Loading
        appear={false}
        autoPosition={false}
        loading={loading}
        panelStyle={LOADING_PANEL_STYLE.INHERIT}
      />
      <TableContainer ref={scrollElementRef}>
        <GridTable
          collapsable={true}
          gridTemplateColumns={getColumnTrackSizing(getVisibleFlatColumns())}
          stickyHeader
        >
          <TableHead tableInstance={table} />
          <TableBody
            rows={rows}
            rowDirection={rowDirection}
            tableInstance={table}
            virtualizer={virtualizer}
          />
        </GridTable>
      </TableContainer>
      {!disablePagination && (
        <TablePagination
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
