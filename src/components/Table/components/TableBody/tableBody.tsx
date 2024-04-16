import { TableBody as MTableBody } from "@mui/material";
import { Table } from "@tanstack/react-table";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import React, { useCallback } from "react";
import { ROW_DIRECTION } from "../../common/entities";
import { CollapsableRows } from "../TableRows/components/CollapsableRows/collapsableRows";
import { VirtualizedRow } from "../TableRows/components/VirtualizedRow/virtualizedRow";
import { TableRows } from "../TableRows/tableRows";

const OVERSCAN = 20;

export interface TableBodyProps<T> {
  rowDirection: ROW_DIRECTION;
  tableInstance: Table<T>;
}

export const TableBody = <T extends object>({
  rowDirection,
  tableInstance,
}: TableBodyProps<T>): JSX.Element => {
  const { getRowModel } = tableInstance;
  const { rows } = getRowModel();
  const estimateSize = useCallback(() => 100, []);
  const count = rows.length;
  const virtualizer = useWindowVirtualizer({
    count,
    estimateSize,
    measureElement,
    overscan: OVERSCAN,
  });
  return (
    <MTableBody>
      <VirtualizedRow isUpperRow={true} virtualizer={virtualizer} />
      {rowDirection === ROW_DIRECTION.DEFAULT ? (
        <TableRows tableInstance={tableInstance} virtualizer={virtualizer} />
      ) : (
        <CollapsableRows
          tableInstance={tableInstance}
          virtualizer={virtualizer}
        />
      )}
      <VirtualizedRow isUpperRow={false} virtualizer={virtualizer} />
    </MTableBody>
  );
};

/**
 * Measures the height of the element.
 * @param element - Element to measure.
 * @returns height of the element.
 */
function measureElement(element: Element): number {
  // We select the first child element because the row is not a box element due to the "display: contents" style attribute.
  const box = element.children[0];
  if (!box) {
    return 0;
  }
  return box.getBoundingClientRect().height;
}
