import { TableBody as MTableBody } from "@mui/material";
import { RowData, Table } from "@tanstack/react-table";
import React from "react";
import { ROW_DIRECTION } from "../../../../../Table/common/entities";
import { TableView } from "../../table";
import { CollapsableRows } from "../TableRows/components/CollapsableRows/collapsableRows";
import { TableRows } from "../TableRows/tableRows";

export interface TableBodyProps<T extends RowData> {
  rowDirection: ROW_DIRECTION;
  tableInstance: Table<T>;
  tableView?: TableView;
}

export const TableBody = <T extends RowData>({
  rowDirection,
  tableInstance,
  tableView,
}: TableBodyProps<T>): JSX.Element => {
  return (
    <MTableBody>
      {rowDirection === ROW_DIRECTION.DEFAULT ? (
        <TableRows tableInstance={tableInstance} tableView={tableView} />
      ) : (
        <CollapsableRows tableInstance={tableInstance} />
      )}
    </MTableBody>
  );
};
