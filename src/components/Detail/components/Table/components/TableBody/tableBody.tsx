import { TableBody as MTableBody } from "@mui/material";
import { Row, RowData, Table } from "@tanstack/react-table";
import { JSX } from "react";
import { ROW_DIRECTION } from "../../../../../Table/common/entities";
import { TableView } from "../../table";
import { CollapsableRows } from "../TableRows/components/CollapsableRows/collapsableRows";
import { TableRows } from "../TableRows/tableRows";

export interface TableBodyProps<T extends RowData> {
  rowDirection: ROW_DIRECTION;
  /**
   * Optional override for the rows rendered by <TableBody>.
   * - Omit to show the table’s full leaf-level row model.
   * - Pass `group.subRows` (or any other subset) to display a “mini-table” for a single group e.g. the rows that belong to one Data-Dictionary entity.
   */
  rows?: Row<T>[];
  tableInstance: Table<T>;
  tableView?: TableView;
}

export const TableBody = <T extends RowData>({
  rowDirection,
  rows,
  tableInstance,
  tableView,
}: TableBodyProps<T>): JSX.Element => {
  return (
    <MTableBody>
      {rowDirection === ROW_DIRECTION.DEFAULT ? (
        <TableRows
          rows={rows}
          tableInstance={tableInstance}
          tableView={tableView}
        />
      ) : (
        <CollapsableRows rows={rows} tableInstance={tableInstance} />
      )}
    </MTableBody>
  );
};
