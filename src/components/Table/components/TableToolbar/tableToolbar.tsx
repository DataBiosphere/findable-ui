import { Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { ListViewConfig } from "../../../../config/entities";
import { useExploreState } from "../../../../hooks/useExploreState";
import { ROW_DIRECTION } from "../../common/entities";
import { getEditColumnOptions, isAnyRowSelected } from "../../common/utils";
import { CheckboxMenu } from "../CheckboxMenu/checkboxMenu";
import { DownloadEntityResults } from "../DownloadEntityResults/downloadEntityResults";
import { PaginationSummary } from "../PaginationSummary/paginationSummary";
import { RowSelection } from "./components/RowSelection/rowSelection";
import { Toolbar, ToolbarActions } from "./tableToolbar.styles";

export interface TableToolbarProps<T> {
  listView?: ListViewConfig;
  rowDirection: ROW_DIRECTION;
  tableInstance: Table<T>;
}

export const TableToolbar = <T extends object>({
  listView,
  rowDirection,
  tableInstance,
}: TableToolbarProps<T>): JSX.Element => {
  const { exploreState } = useExploreState();
  const { paginationState } = exploreState;
  const { currentPage, pages, pageSize, rows } = paginationState;
  const { getSelectedRowModel, resetColumnVisibility } = tableInstance;
  const { enableDownload } = listView || {};
  const isLastPage = currentPage === pages;
  const editColumnOptions = getEditColumnOptions(tableInstance);
  const showToolbar =
    rowDirection === ROW_DIRECTION.DEFAULT &&
    (editColumnOptions || enableDownload);

  /**
   * Resets column visibility to default state.
   */
  const onResetColumnVisibility = (): void => {
    resetColumnVisibility(false);
  };

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
            <CheckboxMenu
              label="Edit Columns"
              onReset={onResetColumnVisibility}
              options={editColumnOptions}
            />
          </ToolbarActions>
        </Toolbar>
      )}
    </Fragment>
  );
};
