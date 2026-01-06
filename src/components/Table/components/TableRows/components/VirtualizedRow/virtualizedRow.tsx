import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import { JSX, useMemo } from "react";

export interface VirtualizedRowProps {
  isUpperRow: boolean;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}

export const VirtualizedRow = ({
  isUpperRow,
  virtualizer,
}: VirtualizedRowProps): JSX.Element => {
  const virtualItems = virtualizer.getVirtualItems();
  const virtualSize = virtualizer.getTotalSize();
  const topPadding = useMemo(
    () => calculateTopPadding(virtualItems),
    [virtualItems],
  );
  const bottomPadding = useMemo(
    () => calculateBottomPadding(virtualItems, virtualSize),
    [virtualItems, virtualSize],
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
 * @returns bottom padding.
 */
function calculateBottomPadding(
  virtualItems: VirtualItem[],
  virtualSize: number,
): number {
  if (virtualItems.length === 0) {
    return 0;
  }
  return virtualSize - virtualItems[virtualItems.length - 1]?.end;
}

/**
 * Returns the top padding for the virtualized row.
 * @param virtualItems - Virtual items.
 * @returns top padding.
 */
function calculateTopPadding(virtualItems: VirtualItem[]): number {
  if (virtualItems.length === 0) {
    return 0;
  }
  return virtualItems[0].start;
}
