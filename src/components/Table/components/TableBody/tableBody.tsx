import { TableBody as MTableBody } from "@mui/material";
import { Row, RowData, Table } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import { JSX } from "react";
import { ROW_DIRECTION } from "../../common/entities";
import { CollapsableRows } from "../TableRows/components/CollapsableRows/collapsableRows";
import { VirtualizedRow } from "../TableRows/components/VirtualizedRow/virtualizedRow";
import { TableRows } from "../TableRows/tableRows";

/**
 * Props for the TableBody component.
 */
export interface TableBodyProps<T extends RowData> {
  rowDirection: ROW_DIRECTION;
  rows: Row<T>[];
  tableInstance: Table<T>;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}

/**
 * Table body, rendering the virtualized rows between top and bottom spacer rows.
 * Rows render as table rows in the default row direction and as collapsable rows otherwise.
 * @param props - Component props.
 * @param props.rowDirection - Row direction.
 * @param props.rows - Rows to virtualize.
 * @param props.tableInstance - TanStack table instance.
 * @param props.virtualizer - Row virtualizer.
 * @returns The table body.
 */
export const TableBody = <T extends RowData>({
  rowDirection,
  rows,
  tableInstance,
  virtualizer,
}: TableBodyProps<T>): JSX.Element => {
  return (
    <MTableBody>
      <VirtualizedRow isUpperRow={true} virtualizer={virtualizer} />
      {rowDirection === ROW_DIRECTION.DEFAULT ? (
        <TableRows rows={rows} virtualizer={virtualizer} />
      ) : (
        <CollapsableRows
          rows={rows}
          tableInstance={tableInstance}
          virtualizer={virtualizer}
        />
      )}
      <VirtualizedRow isUpperRow={false} virtualizer={virtualizer} />
    </MTableBody>
  );
};
