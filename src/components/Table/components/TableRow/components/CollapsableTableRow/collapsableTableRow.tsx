import { JSX, memo } from "react";
import { CollapsableCell } from "../../../TableCell/components/CollapsableCell/collapsableCell";
import { StyledTableRow } from "../../../TableRows/components/CollapsableRows/collapsableRows.styles";
import { CollapsableTableRowProps } from "./types";

/**
 * Memoized vertical/mobile (collapsable) table row. `CollapsableRows` otherwise
 * maps rows inline, so any table state change re-renders every collapsable
 * card; memoizing the row limits re-renders to the rows whose own state
 * changed.
 *
 * Dynamic state is passed as props so memo's shallow compare can detect it —
 * `isExpanded` drives the collapse (read by `CollapsableCell` off `row`, so it
 * needs no destructuring here), plus `isSelected` / `isPreview` / `isDisabled`.
 */
export const CollapsableTableRow = memo(function CollapsableTableRow({
  isDisabled,
  isPreview,
  isSelected,
  measureElement,
  row,
  rowIndex,
}: CollapsableTableRowProps): JSX.Element {
  return (
    <StyledTableRow
      data-index={rowIndex}
      isPreview={isPreview}
      isSelected={isSelected}
      ref={measureElement}
    >
      <CollapsableCell isDisabled={isDisabled} row={row} />
    </StyledTableRow>
  );
});
