import { VirtualItem } from "@tanstack/react-virtual";
import { JSX, useMemo } from "react";
import type { TableVirtualizer } from "../../../../hooks/UseVirtualization/types";

/**
 * Props for the VirtualizedRow component.
 */
export interface VirtualizedRowProps {
  isUpperRow: boolean;
  virtualizer: TableVirtualizer;
}

/**
 * Spacer row filling the space of the rows the virtualizer has not rendered, above or below the rendered rows.
 * @param props - Component props.
 * @param props.isUpperRow - Whether the spacer sits above the rendered rows; otherwise it sits below them.
 * @param props.virtualizer - Row virtualizer.
 * @returns The spacer row, or nothing when there is no space to fill.
 */
export const VirtualizedRow = ({
  isUpperRow,
  virtualizer,
}: VirtualizedRowProps): JSX.Element => {
  const virtualItems = virtualizer.getVirtualItems();
  const virtualSize = virtualizer.getTotalSize();
  // Item offsets include the table body's offset from the top of the page.
  const { scrollMargin } = virtualizer.options;
  const topPadding = useMemo(
    () => calculateTopPadding(virtualItems, scrollMargin),
    [scrollMargin, virtualItems],
  );
  const bottomPadding = useMemo(
    () => calculateBottomPadding(virtualItems, virtualSize, scrollMargin),
    [scrollMargin, virtualItems, virtualSize],
  );
  const padding = isUpperRow ? topPadding : bottomPadding;
  return (
    <>
      {padding > 0 && (
        <tr>
          <td style={{ gridColumn: "1 / -1", height: padding }} />
        </tr>
      )}
    </>
  );
};

/**
 * Returns the bottom padding for the virtualized row.
 * @param virtualItems - Virtual items.
 * @param virtualSize - Virtual size.
 * @param scrollMargin - Table body's offset from the top of the page, included in the item offsets.
 * @returns bottom padding.
 */
function calculateBottomPadding(
  virtualItems: VirtualItem[],
  virtualSize: number,
  scrollMargin: number,
): number {
  if (virtualItems.length === 0) {
    return 0;
  }
  return (
    virtualSize - (virtualItems[virtualItems.length - 1]?.end - scrollMargin)
  );
}

/**
 * Returns the top padding for the virtualized row.
 * @param virtualItems - Virtual items.
 * @param scrollMargin - Table body's offset from the top of the page, included in the item offsets.
 * @returns top padding.
 */
function calculateTopPadding(
  virtualItems: VirtualItem[],
  scrollMargin: number,
): number {
  if (virtualItems.length === 0) {
    return 0;
  }
  return virtualItems[0].start - scrollMargin;
}
