import { Grid } from "@mui/material";
import { RowData, Table } from "@tanstack/react-table";
import { Fragment, JSX } from "react";
import { ListViewConfig } from "../../../../config/entities";
import { useExploreState } from "../../../../hooks/useExploreState";
import { ViewToggle } from "../../../Index/components/EntityView/components/controls/ViewToggle/viewToggle";
import { isAnyRowSelected } from "../../common/utils";
import { PaginationSummary } from "../PaginationSummary/paginationSummary";
import { TableDownload } from "../TableFeatures/TableDownload/tableDownload";
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
}: TableToolbarProps<T>): JSX.Element => {
  const { exploreState } = useExploreState();
  const { paginationState } = exploreState;
  const { currentPage, pages, pageSize, rows } = paginationState;
  const { getSelectedRowModel } = tableInstance;
  const { rowPreviewView } = listView || {};
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
          <TableDownload table={tableInstance} />
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
