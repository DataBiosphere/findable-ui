import { RowData } from "@tanstack/react-table";
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
 * Per-row state is passed as props so memo's shallow compare can detect
 * changes. `isPreview` / `isSelected` style the row and `isDisabled` gates the
 * expand toggle — all used directly here. `isExpanded` (collapse state),
 * `cells` (`row.getVisibleCells()`, whose identity changes only when column
 * visibility does) and `subRowSelectionSignature` (the grouped card's per-sub-row
 * selection signature) are compared as memo keys but re-derived from `row`
 * inside `CollapsableCell`, so they aren't destructured here. `subRowSelectionSignature`
 * matters because a group card renders its sub-rows' checkboxes, yet the
 * parent's own `isSelected` only flips when every sub-row is selected — without
 * it, selecting a second sub-row (or deselecting one of two) changes no
 * compared prop and the checkbox goes stale.
 *
 * `memo` erases the generic type parameter, so the export is cast back to a
 * generic function type to preserve `Row<T>` inference at the call site.
 */
export const CollapsableTableRow = memo(function CollapsableTableRow<
  T extends RowData,
>({
  isDisabled,
  isPreview,
  isSelected,
  measureElement,
  row,
  rowIndex,
}: CollapsableTableRowProps<T>): JSX.Element {
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
}) as <T extends RowData>(props: CollapsableTableRowProps<T>) => JSX.Element;
