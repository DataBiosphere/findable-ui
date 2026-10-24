import { RowData, Table } from "@tanstack/react-table";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { ROW_DIRECTION } from "../../common/entities";
import { VIRTUALIZER_OPTIONS } from "./constants";
import { UseVirtualizationProps } from "./types";
import {
  getRowsForVirtualization,
  observeScrollMargin,
  subscribeToNothing,
  supportsPageScroll,
} from "./utils";

/**
 * Virtualizes the table's rows within its scroll container, or, with page scroll, against the page.
 * With page scroll, the page scrolls rather than the table, and the rows start at the table body's offset from the top of the page, which is observed as the content above the table changes. Where the page scroll layout isn't supported, it falls back to the scroll container.
 * In the vertical row direction with grouping applied, only grouped rows are virtualized.
 * @param options - Hook options.
 * @param options.pageScroll - Whether the page scrolls rather than the table, as on the index page; defaults to false.
 * @param options.rowDirection - Row direction.
 * @param options.table - TanStack table instance.
 * @returns The rows to virtualize, a ref for the table container and the virtualizer.
 */
export const useVirtualization = <T extends RowData>({
  pageScroll: wantsPageScroll = false,
  rowDirection,
  table,
}: {
  pageScroll?: boolean;
  rowDirection: ROW_DIRECTION;
  table: Table<T>;
}): UseVirtualizationProps<T> => {
  // Ref for the table container: the scroll box in the fallback layout, and where the table body's offset is measured from.
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);
  // Rendered as the page scroll layout on the server, then checked in the browser.
  const supported = useSyncExternalStore(
    subscribeToNothing,
    supportsPageScroll,
    () => true,
  );
  const pageScroll = wantsPageScroll && supported;

  // Derive the list of rows eligible for virtualization based on grouping and row direction.
  const rows = getRowsForVirtualization(table, rowDirection);
  // The table container is unmounted while there are no rows, e.g. "No Results", and rendered again with them.
  const hasRows = rows.length > 0;

  useLayoutEffect(
    () =>
      pageScroll
        ? observeScrollMargin(scrollElementRef.current, setScrollMargin)
        : undefined,
    [hasRows, pageScroll],
  );

  // Build both virtualizers; only the one for the current layout is enabled.
  const options = { count: rows.length, ...VIRTUALIZER_OPTIONS };
  const windowVirtualizer = useWindowVirtualizer({
    ...options,
    enabled: pageScroll,
    scrollMargin,
  });
  const boxVirtualizer = useVirtualizer({
    ...options,
    enabled: !pageScroll,
    getScrollElement: () => scrollElementRef.current,
  });

  return {
    rows,
    scrollElementRef,
    virtualizer: pageScroll ? windowVirtualizer : boxVirtualizer,
  };
};
