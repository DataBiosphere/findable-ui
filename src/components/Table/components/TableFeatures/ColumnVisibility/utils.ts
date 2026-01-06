import { RowData, Table, VisibilityState } from "@tanstack/react-table";

/**
 * Resets column visibility state of the table.
 * ### Default Behavior:
 * - Column visibility state is reset to initial state.
 * ### Grouping State:
 * - Column visibility state is reset to initial state, with any grouped columns remaining visible.
 * @param table - Table.
 */
export function handleResetVisibilityState<T extends RowData>(
  table: Table<T>,
): void {
  const { getState, initialState, resetColumnVisibility, setColumnVisibility } =
    table;
  const { grouping } = getState();
  if (grouping.length === 0) {
    resetColumnVisibility(); // Resets column visibility state.
    return;
  }

  // Table is grouped.
  // Ensure grouped columns remain visible (as their initial visibility state may have been `false`).
  const groupedColumnVisibility: VisibilityState = {};
  for (const id of grouping) {
    groupedColumnVisibility[id] = true;
  }

  setColumnVisibility({
    ...initialState.columnVisibility,
    ...groupedColumnVisibility,
  });
}
