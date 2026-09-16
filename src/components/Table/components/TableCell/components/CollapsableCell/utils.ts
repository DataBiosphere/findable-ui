import { ARIA_LABEL } from "./constants";

/**
 * Returns the accessible name for the row's expand toggle. It carries the row's
 * number because every row in a table renders one of these, and a bare "Row
 * details" repeated per row is indistinguishable in a screen reader's element
 * list. The number is the row's index within the table's data, so it is unique
 * per row but is not printed anywhere on screen, and under client-side sorting
 * it follows the data rather than the displayed order. The name is stable
 * across both states — the button carries `aria-expanded`, which is what
 * announces expanded or collapsed, so encoding the next action in the name too
 * would both duplicate that state and move the target out from under anyone
 * addressing the control by name.
 * @param rowIndex - Zero-based index of the row within the table's data.
 * @returns The toggle's accessible name.
 */
export function getToggleLabel(rowIndex: number): string {
  return `${ARIA_LABEL.ROW_DETAILS}: ${rowIndex + 1}`;
}
