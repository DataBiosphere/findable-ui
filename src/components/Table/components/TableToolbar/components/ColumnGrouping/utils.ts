import { Column, GroupingState, RowData, Table } from "@tanstack/react-table";

/**
 * Retrieves the button label for the column grouping dropdown.
 * Currently, the grouping state supports grouping by a single column only.
 * @param groupingByColumnId - Map of column groupings by column ID.
 * @param groupingState - Grouping state.
 * @returns button label.
 */
export function getButtonLabel<T extends RowData>(
  groupingByColumnId: Map<string, [string, Column<T>]>,
  groupingState: GroupingState
): string {
  const grouping = groupingByColumnId.get(groupingState[0]);
  if (!grouping) return "Group by";
  return `Group by: ${grouping[0]}`;
}

/**
 * Retrieves a map of column groupings by column ID from the given table instance.
 * Columns that are group-able with a `string` header are included and are keyed by
 * their column ID. The value is a tuple containing the column header and the column instance.
 * @param table - Table.
 * @returns map of column grouping by column id.
 */
export function getColumnGrouping<T extends RowData>(
  table: Table<T>
): Map<string, [string, Column<T>]> {
  const groupingByColumnId = new Map<string, [string, Column<T>]>();
  for (const column of table.getAllColumns()) {
    const {
      columnDef: { header },
      getCanGroup,
      id,
    } = column;
    if (!getCanGroup()) continue;
    // Currently, headers are configured as strings.
    // Only include columns that have a string header (for now).
    if (typeof header !== "string") continue;
    groupingByColumnId.set(id, [header, column]);
  }
  return groupingByColumnId;
}
