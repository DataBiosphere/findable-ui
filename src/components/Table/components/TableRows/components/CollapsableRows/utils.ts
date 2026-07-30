import { Row, RowData } from "@tanstack/react-table";

/**
 * Returns a per-sub-row selection signature for a grouped row: one character per
 * sub-row encoding its selection as "2" (all/selected), "1" (some) or "0"
 * (none). Used as a memo key for the grouped card (which renders its sub-rows'
 * checkboxes via `CollapsableCell.getRowVisibleCells`) so it re-renders whenever
 * any sub-row's checkbox state changes — boolean aggregates (`getIsSomeSelected`
 * / `getIsAllSubRowsSelected`) can't distinguish 1 selected from 2. The
 * tri-state (rather than binary) encoding also catches a nested subgroup's
 * indeterminate transition under multi-level grouping. Built with a loop to
 * avoid allocating an intermediate array on every render.
 *
 * Gated on `row.getIsGrouped()` to match where a card actually renders sub-row
 * checkboxes: only grouped rows do. Any other row — including a non-grouped
 * expandable/tree row that happens to have `subRows` — renders its own checkbox
 * as its own card (covered by `isSelected`), so it returns an empty signature
 * and contributes nothing to the memo key.
 * @param row - Row.
 * @returns Sub-row selection signature, or "" when the row isn't grouped.
 */
export function getSubRowSelectionSignature<T extends RowData>(
  row: Row<T>,
): string {
  if (!row.getIsGrouped()) return "";
  let signature = "";
  for (const subRow of row.subRows) {
    if (subRow.getIsSelected()) signature += "2";
    else if (subRow.getIsSomeSelected()) signature += "1";
    else signature += "0";
  }
  return signature;
}
