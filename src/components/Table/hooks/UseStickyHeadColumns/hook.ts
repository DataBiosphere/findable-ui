import { RefObject, useLayoutEffect } from "react";
import { observeColumnTracks } from "./utils";

/**
 * Keeps the pinned copy of the column head on the table's own column widths.
 * The copy is a separate, head-only table, so content-sized tracks (e.g. an
 * `auto` column) would otherwise resolve to different widths there. The widths
 * are written from the resize observer, without re-rendering, whenever the
 * table or a column resizes.
 * @param scrollElementRef - Ref to the table container.
 * @param gridTemplateColumns - The table's configured track sizing; observing restarts when it changes.
 * @param isRendered - Whether the table is rendered; observing restarts when it's rendered again, e.g. after "No Results".
 */
export const useStickyHeadColumns = (
  scrollElementRef: RefObject<HTMLDivElement | null>,
  gridTemplateColumns: string,
  isRendered: boolean,
): void => {
  useLayoutEffect(
    () => observeColumnTracks(scrollElementRef.current),
    [gridTemplateColumns, isRendered, scrollElementRef],
  );
};
