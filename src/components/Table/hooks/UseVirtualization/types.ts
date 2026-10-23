import { Row, RowData } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import { RefObject } from "react";

/**
 * Row virtualizer: against the page scroll, or, where the page doesn't scroll (the fallback layout), against the table's own box.
 */
export type TableVirtualizer =
  Virtualizer<HTMLDivElement, Element> | Virtualizer<Window, Element>;

/**
 * Return type for the useVirtualization hook.
 */
export interface UseVirtualizationProps<T extends RowData> {
  rows: Row<T>[];
  scrollElementRef: RefObject<HTMLDivElement | null>;
  virtualizer: TableVirtualizer;
}
