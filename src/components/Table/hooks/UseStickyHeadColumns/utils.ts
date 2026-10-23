import { STICKY_HEAD_COLUMNS } from "../../common/constants";

/**
 * Observes the table's computed column widths and writes them to a custom
 * property on the table's scroll wrapper, where the pinned copy of the column
 * head reads them. The table and each of its head cells are observed: a
 * content-sized column can change width without the table changing size, e.g.
 * as virtualized rows with wider content render.
 * @param container - Table container; nothing is observed when null, without a table or wrapper, or where ResizeObserver is unavailable.
 * @returns Cleanup that stops observing and removes the property.
 */
export function observeColumnTracks(
  container: HTMLElement | null,
): (() => void) | undefined {
  const table = container?.querySelector("table");
  const wrapper = container?.parentElement;
  if (!table || !wrapper || typeof ResizeObserver === "undefined") return;
  const update = (): void =>
    wrapper.style.setProperty(
      STICKY_HEAD_COLUMNS,
      getComputedStyle(table).gridTemplateColumns,
    );
  update();
  const observer = new ResizeObserver(update);
  observer.observe(table);
  table
    .querySelectorAll(".MuiTableHead-root th")
    .forEach((cell) => observer.observe(cell));
  return (): void => {
    observer.disconnect();
    wrapper.style.removeProperty(STICKY_HEAD_COLUMNS);
  };
}
