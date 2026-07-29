import { Cell, Row, RowData } from "@tanstack/react-table";

export interface VirtualizedTableRowProps<T extends RowData> {
  canExpand: boolean;
  canSelect: boolean;
  // `getVisibleCells()` is memoized by TanStack keyed on column visibility, so
  // passing it as a prop lets memo detect column-visibility toggles (the row
  // object and state booleans don't change when a column is shown/hidden).
  cells: Cell<T, unknown>[];
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
