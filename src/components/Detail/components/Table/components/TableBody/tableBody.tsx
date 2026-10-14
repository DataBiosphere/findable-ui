import { TableBody as MTableBody } from "@mui/material";
import { Row, RowData, Table } from "@tanstack/react-table";
import { JSX } from "react";
import { ROW_DIRECTION } from "../../../../../Table/common/entities";
import { TableView } from "../../table";
import { CollapsableRows } from "../TableRows/components/CollapsableRows/collapsableRows";
import { TableRows } from "../TableRows/tableRows";

/**
 * Props for the TableBody component.
 */
export interface TableBodyProps<T extends RowData> {
  rowDirection: ROW_DIRECTION;
  /**
   * Optional override for the rows rendered by <TableBody>.
   * - Omit to show the table’s row model (top-level rows only when stacked).
   * - Pass `group.subRows` (or any other subset) to display a “mini-table” for a single group e.g. the rows that belong to one Data-Dictionary entity.
   */
  rows?: Row<T>[];
  tableInstance: Table<T>;
  tableView?: TableView;
}

/**
 * Table body; rows are laid out in columns, or stacked as collapsable rows,
 * depending on the row direction.
 * @param props - Component props.
 * @param props.rowDirection - Row direction.
 * @param props.rows - Rows to render; defaults to the table's row model (top-level rows only when stacked).
 * @param props.tableInstance - Table instance.
 * @param props.tableView - Table view options, for the cell size.
 * @returns The table body.
 */
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
