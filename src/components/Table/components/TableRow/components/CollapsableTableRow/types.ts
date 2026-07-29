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
  // A grouped card renders its sub-rows' checkboxes, but the parent's own
  // `isSelected` only flips when every sub-row is selected, and boolean
  // aggregates (`getIsSomeSelected` / `getIsAllSubRowsSelected`) can't tell 1
  // selected from 2. This per-sub-row selection signature changes on every
  // sub-row toggle, so it's a memo key that re-renders the card (compared but
  // read off `row` inside `CollapsableCell`, so not destructured). Empty for
  // non-grouped rows, whose own checkbox is covered by `isSelected`.
  subRowSelection: string;
}
