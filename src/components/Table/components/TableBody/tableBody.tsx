import { TableBody as MTableBody } from "@mui/material";
import { Row, RowData, Table } from "@tanstack/react-table";
import React from "react";
import { ROW_DIRECTION } from "../../common/entities";
import { CollapsableRows } from "../TableRows/components/CollapsableRows/collapsableRows";
import { VirtualizedRow } from "../TableRows/components/VirtualizedRow/virtualizedRow";
import { TableRows } from "../TableRows/tableRows";
import { useVirtualizer } from "./hooks/virtualizer/hook";
import { getAllVirtualizedRows } from "./utils";

export interface TableBodyProps<T extends RowData> {
  rowDirection: ROW_DIRECTION;
  rows: Row<T>[];
  tableInstance: Table<T>;
}

export const TableBody = <T extends RowData>({
  rowDirection,
  rows,
  tableInstance,
}: TableBodyProps<T>): JSX.Element => {
  const virtualizedRows = getAllVirtualizedRows(
    tableInstance,
    rows,
    rowDirection
  );
  const { virtualizer } = useVirtualizer(virtualizedRows);
  return (
    <MTableBody>
      <VirtualizedRow isUpperRow={true} virtualizer={virtualizer} />
      {rowDirection === ROW_DIRECTION.DEFAULT ? (
        <TableRows rows={virtualizedRows} virtualizer={virtualizer} />
      ) : (
        <CollapsableRows
          rows={virtualizedRows}
          tableInstance={tableInstance}
          virtualizer={virtualizer}
        />
      )}
      <VirtualizedRow isUpperRow={false} virtualizer={virtualizer} />
    </MTableBody>
  );
};
