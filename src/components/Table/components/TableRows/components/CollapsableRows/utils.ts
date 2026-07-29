import { Row, RowData } from "@tanstack/react-table";

/**
 * Returns a per-sub-row selection signature for a grouped row: a "1"/"0" string,
 * one character per sub-row's selection state. Used as a memo key for the
 * grouped card (which renders its sub-rows' checkboxes) so it re-renders
 * whenever any sub-row toggles — boolean aggregates (`getIsSomeSelected` /
 * `getIsAllSubRowsSelected`) can't distinguish 1 selected from 2. Empty string
 * for non-grouped rows (no sub-rows), whose own checkbox is covered elsewhere.
 * @param row - Row.
 * @returns Sub-row selection signature.
 */
export function getSubRowSelectionSignature<T extends RowData>(
  row: Row<T>,
): string {
  return row.subRows
    .map((subRow) => (subRow.getIsSelected() ? "1" : "0"))
    .join("");
}
