import { TableContainer } from "@mui/material";
import { RowData, Table as TanStackTable } from "@tanstack/react-table";
import { Fragment, JSX, useCallback } from "react";
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
import { PROPERTY } from "../../hooks/useHtmlStyle/constants";
import { ExploreActionKind } from "../../providers/exploreState";
import { useLayoutHeight } from "../Layout/hooks/UseLayoutHeight/hook";
import { Loading, LOADING_PANEL_STYLE } from "../Loading/loading";
import { NoResults } from "../NoResults/noResults";
import { getColumnTrackSizing } from "../TableCreator/options/columnTrackSizing/utils";
import { STICKY_HEAD_COLUMNS } from "./common/constants";
import { ROW_DIRECTION } from "./common/entities";
import { isClientFilteringEnabled } from "./common/utils";
import { TableBody } from "./components/TableBody/tableBody";
import {
  STICKY_HEAD_CONTEXT_VALUE,
  TableHeadContext,
} from "./components/TableHead/context";
import { TableHead } from "./components/TableHead/tableHead";
import { TablePagination } from "./components/TablePagination/tablePagination";
import { TableToolbar } from "./components/TableToolbar/tableToolbar";
import { useStickyHeadColumns } from "./hooks/UseStickyHeadColumns/hook";
import { useVirtualization } from "./hooks/UseVirtualization/hook";
import { GridTable, StyledStickyHead, StyledTableScroll } from "./table.styles";

/**
 * Props for the Table component.
 */
export interface TableProps<T extends RowData> {
  listView?: ListViewConfig;
  loading: boolean;
  /** Whether the page scrolls rather than the table, as on the index page: the column head pins through a copy, and rows are virtualized against the page. Defaults to false. */
  pageScroll?: boolean;
  table: TanStackTable<T>;
}

/**
 * Virtualized table with its toolbar, head, body and pagination, showing "No Results found" when not loading and there are no rows.
 * Rows render horizontally from the sm breakpoint up and as collapsable vertical rows below it.
 * Paging calls the TanStack table's next and previous page functions when client filtering is enabled; otherwise it dispatches a table pagination action to the explore state and tracks the event.
 * @param props - Component props.
 * @param props.listView - List view config; pagination is hidden when its disablePagination is true.
 * @param props.loading - Whether the table data is loading.
 * @param props.pageScroll - Whether the page scrolls rather than the table; defaults to false, where the table scrolls in its own box.
 * @param props.table - TanStack table instance.
 * @returns The table, or the no results message.
 */
export const Table = <T extends RowData>({
  listView,
  loading,
  pageScroll = false,
  table,
}: TableProps<T>): JSX.Element => {
  const bpDownSm = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "sm");
  const exploreMode = useExploreMode();
  const { exploreDispatch, exploreState } = useExploreState();
  const { paginationState } = exploreState;
  const { currentPage, pages } = paginationState;
  const { disablePagination = false } = listView || {};
  const clientFiltering = isClientFilteringEnabled(exploreMode);
  const rowDirection = bpDownSm
    ? ROW_DIRECTION.VERTICAL
    : ROW_DIRECTION.DEFAULT;
  const { rows, scrollElementRef, virtualizer } = useVirtualization({
    pageScroll,
    rowDirection,
    table,
  });

  const {
    getVisibleFlatColumns,
    nextPage: tableNextPage,
    previousPage: tablePreviousPage,
  } = table;
  const gridTemplateColumns = getColumnTrackSizing(getVisibleFlatColumns());
  const noResults = !loading && (!rows || rows.length === 0);
  // The observers restart when the table is rendered again after "No Results".
  useStickyHeadColumns(scrollElementRef, gridTemplateColumns, !noResults);
  // The pinned head's height, for the index page's scroll padding: a column title can wrap.
  const { ref: stickyHeadRef } = useLayoutHeight<HTMLDivElement>(
    PROPERTY.TABLE_HEAD_HEIGHT,
    noResults,
  );

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

  // The table's own scroll box; with page scroll it only scrolls sideways.
  const tableContainer = (
    <TableContainer ref={scrollElementRef}>
      <GridTable
        collapsable={true}
        gridTemplateColumns={gridTemplateColumns}
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
  );

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
      {pageScroll ? (
        <StyledTableScroll>
          {/* A copy of the column head that pins as the page scrolls. */}
          <StyledStickyHead aria-hidden>
            <div ref={stickyHeadRef}>
              <GridTable
                gridTemplateColumns={`var(${STICKY_HEAD_COLUMNS}, ${gridTemplateColumns})`}
                stickyHeader
              >
                <TableHeadContext.Provider value={STICKY_HEAD_CONTEXT_VALUE}>
                  <TableHead tableInstance={table} />
                </TableHeadContext.Provider>
              </GridTable>
            </div>
          </StyledStickyHead>
          {tableContainer}
        </StyledTableScroll>
      ) : (
        tableContainer
      )}
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
