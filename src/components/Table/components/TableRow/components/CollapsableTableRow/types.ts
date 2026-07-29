import { Cell, Row, RowData } from "@tanstack/react-table";

export interface CollapsableTableRowProps<T extends RowData> {
  // `getVisibleCells()` is memoized by TanStack keyed on column visibility;
  // passed as a memo-comparison key so column-visibility toggles re-render the
  // row (`CollapsableCell` recomputes its own cells off `row`). Compared but not
  // destructured.
  cells: Cell<T, unknown>[];
  isDisabled: boolean;
  isExpanded: boolean;
  isPreview: boolean;
  isSelected: boolean;
  measureElement: (element: Element | null) => void;
  row: Row<T>;
  rowIndex: number;
}
