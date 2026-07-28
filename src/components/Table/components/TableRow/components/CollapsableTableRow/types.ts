import { Row, RowData } from "@tanstack/react-table";

export interface CollapsableTableRowProps {
  isDisabled: boolean;
  isExpanded: boolean;
  isPreview: boolean;
  isSelected: boolean;
  measureElement: (element: Element | null) => void;
  row: Row<RowData>;
  rowIndex: number;
}
