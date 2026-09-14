import { Cell, RowData } from "@tanstack/react-table";
import { resolveAriaLabel } from "../../../../../../utils/ariaLabel";
import { ARIA_LABEL } from "./constants";

/**
 * Returns the pinned cell's value for use as the row's accessible identifier.
 * Cell values are typed `unknown`, so anything that is not a string or number
 * is discarded rather than stringified — "Row details: [object Object]" is worse
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
 * Returns the accessible name for the row's expand toggle. The name is stable
 * across both states — the button carries `aria-expanded`, which is what
 * announces expanded or collapsed, so encoding the next action in the name too
 * would both duplicate that state and move the target out from under anyone
 * addressing the control by name. It carries the row's identifier because every
 * row in a table renders one of these and a bare "Row details" repeated per row
 * is indistinguishable in a screen reader's element list.
 * @param rowLabel - Identifier of the row the toggle belongs to.
 * @returns The toggle's accessible name.
 */
export function getToggleLabel(rowLabel?: string): string {
  return resolveAriaLabel(
    rowLabel && `${ARIA_LABEL.ROW_DETAILS}: ${rowLabel}`,
    ARIA_LABEL.ROW_DETAILS,
  );
}
