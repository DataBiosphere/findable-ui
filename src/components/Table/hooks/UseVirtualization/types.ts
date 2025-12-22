import { Row, RowData } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import { RefObject } from "react";

export interface UseVirtualizationProps<T extends RowData> {
  rows: Row<T>[];
  scrollElementRef: RefObject<HTMLDivElement | null>;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}
