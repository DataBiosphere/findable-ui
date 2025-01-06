import { RowData, Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { ListViewConfig } from "../../../../config/entities";
import { useExploreState } from "../../../../hooks/useExploreState";
import { ROW_DIRECTION } from "../../common/entities";
import { isAnyRowSelected } from "../../common/utils";
import { DownloadEntityResults } from "../DownloadEntityResults/downloadEntityResults";
import { PaginationSummary } from "../PaginationSummary/paginationSummary";
import { ColumnGrouping } from "./components/ColumnGrouping/columnGrouping";
import { ColumnVisibility } from "./components/ColumnVisibility/columnVisibility";
import { RowPreview } from "./components/RowPreview/rowPreview";
import { RowSelection } from "./components/RowSelection/rowSelection";
import { Toolbar, ToolbarActions } from "./tableToolbar.styles";

export interface TableToolbarProps<T extends RowData> {
  listView?: ListViewConfig;
  rowDirection: ROW_DIRECTION;
  tableInstance: Table<T>;
}

export const TableToolbar = <T extends RowData>({
  listView,
  rowDirection,
  tableInstance,
}: TableToolbarProps<T>): JSX.Element => {
  const { exploreState } = useExploreState();
  const { paginationState } = exploreState;
  const { currentPage, pages, pageSize, rows } = paginationState;
  const {
    getSelectedRowModel,
    options: { enableGrouping, enableHiding },
  } = tableInstance;
  const { enableDownload, rowPreviewView } = listView || {};
  const isLastPage = currentPage === pages;
  const showToolbar =
    rowDirection === ROW_DIRECTION.DEFAULT &&
    (enableHiding || enableDownload || enableGrouping);
  return (
    <Fragment>
      {showToolbar && (
        <Toolbar variant="table">
          {isAnyRowSelected(tableInstance) ? (
            <RowSelection
              rows={getSelectedRowModel().rows}
              rowSelectionView={listView?.rowSelectionView}
            />
          ) : (
            <PaginationSummary
              firstResult={(currentPage - 1) * pageSize + 1}
              lastResult={isLastPage ? rows : pageSize * currentPage}
              totalResult={rows}
            />
          )}
          <ToolbarActions>
            {enableDownload && (
              <DownloadEntityResults
                entityName={exploreState.tabValue}
                rows={tableInstance.getFilteredRowModel().rows}
              />
            )}
            <ColumnGrouping tableInstance={tableInstance} />
            <ColumnVisibility tableInstance={tableInstance} />
          </ToolbarActions>
        </Toolbar>
      )}
      <RowPreview
        rowPreviewView={rowPreviewView}
        tableInstance={tableInstance}
      />
    </Fragment>
  );
};
