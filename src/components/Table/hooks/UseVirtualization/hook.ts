import { RowData, Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { ROW_DIRECTION } from "../../common/entities";
import { UseVirtualizationProps } from "./types";
import { getRowsForVirtualization } from "./utils";

export const useVirtualization = <T extends RowData>({
  rowDirection,
  table,
}: {
  rowDirection: ROW_DIRECTION;
  table: Table<T>;
}): UseVirtualizationProps<T> => {
  // Ref for the scrollable container.
  const scrollElementRef = useRef<HTMLDivElement>(null);

  // Derive the list of rows eligible for virtualization based on grouping and row direction.
  const rows = getRowsForVirtualization(table, rowDirection);

  // Build virtualizer instance.
  const virtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 56,
    gap: 1,
    getScrollElement: () => scrollElementRef.current,
    overscan: 20,
  });

  return { rows, scrollElementRef, virtualizer };
};
