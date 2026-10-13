import { RowData, Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { ROW_DIRECTION } from "../../common/entities";
import { UseVirtualizationProps } from "./types";
import { getRowsForVirtualization } from "./utils";

/**
 * Virtualizes the table's rows within a scroll container.
 * In the vertical row direction with grouping applied, only grouped rows are virtualized.
 * @param options - Hook options.
 * @param options.rowDirection - Row direction.
 * @param options.table - TanStack table instance.
 * @returns The rows to virtualize, a ref for the scroll container and the virtualizer.
 */
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
