import { Row, RowData, Table } from "@tanstack/react-table";
import { SUPPORTS_PAGE_SCROLL } from "../../common/constants";
import { ROW_DIRECTION } from "../../common/entities";

/**
 * Filters and returns the appropriate rows for a virtualized table based on row direction
 * and grouping state.
 * @param table - Table.
 * @param rowDirection - Row direction.
 * @returns Rows based on the provided row direction and table grouping state.
 */
export function getRowsForVirtualization<T extends RowData>(
  table: Table<T>,
  rowDirection: ROW_DIRECTION,
): Row<T>[] {
  const { getRowModel, getState } = table;
  const { rows } = getRowModel();
  const { grouping } = getState();

  // If the row direction is DEFAULT, return all rows.
  if (rowDirection === ROW_DIRECTION.DEFAULT) return rows;

  // If the table is not grouped, return all rows.
  if (grouping.length === 0) return rows;

  // If the row direction is VERTICAL, return only grouped rows.
  return rows.filter(({ getIsGrouped }) => getIsGrouped());
}

/**
 * Returns the table body's offset from the top of the page.
 * @param container - Table container.
 * @returns The offset, in pixels.
 */
export function getScrollMargin(container: HTMLElement): number {
  const body = container.querySelector("tbody") ?? container;
  return body.getBoundingClientRect().top + window.scrollY;
}

/**
 * Observes the table body's offset from the top of the page, which changes when the content above the table changes (alerts, wrapping, the window width).
 * @param container - Table container; nothing is observed when null, or where ResizeObserver is unavailable.
 * @param onChange - Called with the offset, in pixels.
 * @returns Cleanup that stops observing.
 */
export function observeScrollMargin(
  container: HTMLElement | null,
  onChange: (scrollMargin: number) => void,
): (() => void) | undefined {
  if (!container || typeof ResizeObserver === "undefined") return;
  const update = (): void => onChange(getScrollMargin(container));
  update();
  const observer = new ResizeObserver(update);
  observer.observe(document.body);
  return (): void => observer.disconnect();
}

/**
 * Subscribes to nothing: whether the page scroll layout is supported doesn't change while the page is open.
 * @returns Unsubscribe, which does nothing.
 */
export function subscribeToNothing(): () => void {
  return (): void => undefined;
}

/**
 * Returns whether the browser supports the page scroll layout, where the page scrolls and the table's column head pins. The same query switches the layout's styles.
 * @returns True if the page scroll layout is supported.
 */
export function supportsPageScroll(): boolean {
  return typeof CSS !== "undefined" && CSS.supports(SUPPORTS_PAGE_SCROLL);
}
