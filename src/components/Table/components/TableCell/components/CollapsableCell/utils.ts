import { ARIA_LABEL } from "./constants";

/**
 * Returns the accessible name for the row's expand toggle. It carries the row's
 * number because every row in a table renders one of these, and a bare "Row
 * details" repeated per row is indistinguishable in a screen reader's element
 * list. The number is the row's position among the rows actually rendered, so
 * it is unique within the rendered table, matches the order a sighted user
 * sees, and counts from one in a mini-table that renders only a subset of the
 * table's rows. It is deliberately not `row.index`: TanStack scopes that to the
 * row's parent array, so nested rows repeat it and a grouped row's leaves carry
 * their index in the whole dataset. The name is stable across both states — the
 * button carries `aria-expanded`, which is what announces expanded or
 * collapsed, so encoding the next action in the name too would both duplicate
 * that state and move the target out from under anyone addressing the control
 * by name.
 * @param position - Zero-based position of the row among the rendered rows.
 * @returns The toggle's accessible name.
 */
export function getToggleLabel(position: number): string {
  return `${ARIA_LABEL.ROW_DETAILS}: ${position + 1}`;
}
