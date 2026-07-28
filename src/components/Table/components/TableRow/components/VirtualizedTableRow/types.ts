import { Row, RowData } from "@tanstack/react-table";

export interface VirtualizedTableRowProps<T extends RowData> {
  canExpand: boolean;
  canSelect: boolean;
  isAllSubRowsSelected: boolean;
  isExpanded: boolean;
  isGrouped: boolean;
  isPreview: boolean;
  isSelected: boolean;
  isSomeSelected: boolean;
  measureElement: (element: Element | null) => void;
  row: Row<T>;
  rowIndex: number;
}
