import { Row, RowData } from "@tanstack/react-table";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useCallback } from "react";
import { VIRTUALIZER_OPTIONS } from "./constants";
import { UseVirtualizer } from "./types";

/**
 * A hook to create and manage TanStack window virtualizer for table rows.
 * @param rows - Rows.
 * @returns An object containing the virtualizer instance, which manages the visible rows.
 */
export function useVirtualizer<T extends RowData>(
  rows: Row<T>[]
): UseVirtualizer {
  const estimateSize = useCallback(() => 100, []);
  const count = rows.length;
  const virtualizer = useWindowVirtualizer({
    ...VIRTUALIZER_OPTIONS,
    count,
    estimateSize,
  });
  return { virtualizer };
}
