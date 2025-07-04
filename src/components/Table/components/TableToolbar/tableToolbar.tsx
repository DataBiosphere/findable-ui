import { Grid } from "@mui/material";
import { RowData, Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { ListViewConfig } from "../../../../config/entities";
import { useExploreState } from "../../../../hooks/useExploreState";
import { ViewToggle } from "../../../Index/components/EntityView/components/common/ViewToggle/viewToggle";
import { isAnyRowSelected } from "../../common/utils";
import { DownloadEntityResults } from "../DownloadEntityResults/downloadEntityResults";
import { PaginationSummary } from "../PaginationSummary/paginationSummary";
import { ColumnGrouping } from "./components/ColumnGrouping/columnGrouping";
import { ColumnVisibility } from "./components/ColumnVisibility/columnVisibility";
import { RowPreview } from "./components/RowPreview/rowPreview";
import { RowSelection } from "./components/RowSelection/rowSelection";
import { GRID_PROPS } from "./constants";
import { StyledToolbar } from "./tableToolbar.styles";

export interface TableToolbarProps<T extends RowData> {
  listView?: ListViewConfig;
  tableInstance: Table<T>;
}

export const TableToolbar = <T extends RowData>({
  listView,
  tableInstance,
}: TableToolbarProps<T>): JSX.Element | null => {
  const { exploreState } = useExploreState();
  const { paginationState } = exploreState;
  const { currentPage, pages, pageSize, rows } = paginationState;
  const { getSelectedRowModel } = tableInstance;
  const { enableDownload, rowPreviewView } = listView || {};
  return (
    <Fragment>
      <StyledToolbar>
        <Grid {...GRID_PROPS} gap={6}>
          <ViewToggle />
          {isAnyRowSelected(tableInstance) ? (
            <RowSelection
              rows={getSelectedRowModel().rows}
              rowSelectionView={listView?.rowSelectionView}
            />
          ) : (
            <PaginationSummary
              firstResult={(currentPage - 1) * pageSize + 1}
              lastResult={currentPage === pages ? rows : pageSize * currentPage}
              totalResult={rows}
            />
          )}
        </Grid>
        <Grid {...GRID_PROPS}>
          {enableDownload && (
            <DownloadEntityResults
              entityName={exploreState.tabValue}
              rows={tableInstance.getFilteredRowModel().rows}
            />
          )}
          <ColumnGrouping tableInstance={tableInstance} />
          <ColumnVisibility tableInstance={tableInstance} />
        </Grid>
      </StyledToolbar>
      <RowPreview
        rowPreviewView={rowPreviewView}
        tableInstance={tableInstance}
      />
    </Fragment>
  );
};
