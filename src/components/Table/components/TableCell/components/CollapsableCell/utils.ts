import { Cell, RowData } from "@tanstack/react-table";
import { resolveAriaLabel } from "../../../../../../utils/ariaLabel";
import { ARIA_LABEL } from "./constants";

/**
 * Returns the pinned cell's value for use as the row's accessible identifier.
 * Cell values are typed `unknown`, so anything that is not a string or number
 * is discarded rather than stringified — "Expand row: [object Object]" is worse
 * than no identifier at all.
 * @param pinnedCell - The row's pinned cell.
 * @returns The row's identifier, or undefined when it is not a scalar.
 */
export function getRowLabel<T extends RowData>(
  pinnedCell: Cell<T, unknown>,
): string | undefined {
  const value = pinnedCell.getValue();
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return value.trim() || undefined;
  return undefined;
}

/**
 * Returns the accessible name for the row's expand toggle. The button carries a
 * single unfold icon in both states, so the name has to say which action the
 * toggle performs next; it also carries the row's identifier, because every row
 * in a table renders one of these and a bare "Expand row" repeated per row is
 * indistinguishable in a screen reader's element list.
 * @param isExpanded - Whether the row is currently expanded.
 * @param rowLabel - Identifier of the row the toggle belongs to.
 * @returns The toggle's accessible name.
 */
export function getToggleLabel(isExpanded: boolean, rowLabel?: string): string {
  const action = isExpanded ? ARIA_LABEL.COLLAPSE_ROW : ARIA_LABEL.EXPAND_ROW;
  return resolveAriaLabel(rowLabel && `${action}: ${rowLabel}`, action);
}
