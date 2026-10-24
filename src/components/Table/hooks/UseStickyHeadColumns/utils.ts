import { STICKY_HEAD_COLUMNS } from "../../common/constants";

/**
 * Observes the table's computed column widths and writes them to a custom
 * property on the pinned copy of its column head, the element just before the
 * table container. The table and each of its head cells are observed: a
 * content-sized column can change width without the table changing size, e.g.
 * as virtualized rows with wider content render. Unchanged widths aren't
 * rewritten.
 * @param container - Table container; nothing is observed when null, without a table or a head copy, or where ResizeObserver is unavailable.
 * @returns Cleanup that stops observing and removes the property.
 */
export function observeColumnTracks(
  container: HTMLElement | null,
): (() => void) | undefined {
  const table = container?.querySelector("table");
  const stickyHead = container?.previousElementSibling;
  if (
    !table ||
    !(stickyHead instanceof HTMLElement) ||
    typeof ResizeObserver === "undefined"
  )
    return;
  let columns = "";
  const update = (): void => {
    const { gridTemplateColumns } = getComputedStyle(table);
    if (gridTemplateColumns === columns) return;
    columns = gridTemplateColumns;
    stickyHead.style.setProperty(STICKY_HEAD_COLUMNS, columns);
  };
  update();
  const observer = new ResizeObserver(update);
  observer.observe(table);
  table
    .querySelectorAll(".MuiTableHead-root th")
    .forEach((cell) => observer.observe(cell));
  return (): void => {
    observer.disconnect();
    stickyHead.style.removeProperty(STICKY_HEAD_COLUMNS);
  };
}
