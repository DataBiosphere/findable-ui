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
 * Dynamic state is passed as props so memo's shallow compare can detect it —
 * `isExpanded` drives the collapse (read by `CollapsableCell` off `row`, so it
 * needs no destructuring here), plus `isSelected` / `isPreview` / `isDisabled`.
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
