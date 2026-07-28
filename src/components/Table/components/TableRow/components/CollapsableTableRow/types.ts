import { Row, RowData } from "@tanstack/react-table";

export interface CollapsableTableRowProps<T extends RowData> {
  isDisabled: boolean;
  isExpanded: boolean;
  isPreview: boolean;
  isSelected: boolean;
  measureElement: (element: Element | null) => void;
  row: Row<T>;
  rowIndex: number;
}
