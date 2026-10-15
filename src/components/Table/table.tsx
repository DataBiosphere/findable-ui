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
import { ExploreActionKind } from "../../providers/exploreState";
import { Loading, LOADING_PANEL_STYLE } from "../Loading/loading";
import { NoResults } from "../NoResults/noResults";
import { getColumnTrackSizing } from "../TableCreator/options/columnTrackSizing/utils";
import { ROW_DIRECTION } from "./common/entities";
import { isClientFilteringEnabled } from "./common/utils";
import { TableBody } from "./components/TableBody/tableBody";
import { TableHead } from "./components/TableHead/tableHead";
import { TablePagination } from "./components/TablePagination/tablePagination";
import { TableToolbar } from "./components/TableToolbar/tableToolbar";
import { useStickyHead } from "./hooks/UseStickyHead/hook";
import { useVirtualization } from "./hooks/UseVirtualization/hook";
import {
  GridTable,
  StyledStickyHead,
  StyledStickyScrollbar,
  StyledTableContainer,
  StyledTableScroll,
} from "./table.styles";

/**
 * Props for the Table component.
 */
export interface TableProps<T extends RowData> {
  listView?: ListViewConfig;
  loading: boolean;
  stickyHead?: boolean;
  table: TanStackTable<T>;
}

/**
 * Virtualized table with its toolbar, head, body and pagination, showing "No Results found" when not loading and there are no rows.
 * Rows render horizontally from the sm breakpoint up and as collapsable vertical rows below it.
 * Paging calls the TanStack table's next and previous page functions when client filtering is enabled; otherwise it dispatches a table pagination action to the explore state and tracks the event.
 * @param props - Component props.
 * @param props.listView - List view config; pagination is hidden when its disablePagination is true.
 * @param props.loading - Whether the table data is loading.
 * @param props.stickyHead - Whether the table head sticks to the window while the page scrolls.
 * @param props.table - TanStack table instance.
 * @returns The table, or the no results message.
 */
export const Table = <T extends RowData>({
  listView,
  loading,
  stickyHead = false,
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
    rowDirection,
    table,
  });

  const {
    getVisibleFlatColumns,
    nextPage: tableNextPage,
    previousPage: tablePreviousPage,
  } = table;

  const noResults = !loading && (!rows || rows.length === 0);
  const {
    onScroll,
    overflowing,
    scrollbarRef,
    stickyHeadRef,
    stuck,
    tableWidth,
  } = useStickyHead(scrollElementRef, stickyHead && !noResults);
  const gridTemplateColumns = getColumnTrackSizing(getVisibleFlatColumns());

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
      <StyledTableScroll>
        {stickyHead && !bpDownSm && (
          <StyledStickyHead role="presentation" stuck={stuck}>
            <div ref={stickyHeadRef}>
              <GridTable
                collapsable={true}
                gridTemplateColumns={gridTemplateColumns}
              >
                <TableHead tableInstance={table} />
              </GridTable>
            </div>
          </StyledStickyHead>
        )}
        <StyledTableContainer
          onScroll={stickyHead ? onScroll : undefined}
          ref={scrollElementRef}
          stickyHead={stickyHead}
        >
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
        </StyledTableContainer>
        {stickyHead && overflowing && (
          <StyledStickyScrollbar onScroll={onScroll} ref={scrollbarRef}>
            <div style={{ width: tableWidth }} />
          </StyledStickyScrollbar>
        )}
      </StyledTableScroll>
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
