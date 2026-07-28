import { TableCell } from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import { JSX, memo } from "react";
import { TEST_IDS } from "../../../../../../tests/testIds";
import {
  getTableCellAlign,
  getTableCellPadding,
} from "../../../TableCell/common/utils";
import { handleToggleExpanded } from "../../../TableFeatures/RowExpanding/utils";
import { StyledTableRow } from "../../tableRow.styles";
import { VirtualizedTableRowProps } from "./types";

/**
 * Memoized virtualized table row. A table state change (e.g. toggling one
 * row's selection) otherwise re-renders every row in the virtualized body;
 * memoizing the row limits re-renders to the rows whose own state changed.
 *
 * The per-row state is passed as props so memo's shallow compare can detect
 * changes — leaf selection via `isSelected`, grouped select-all / indeterminate
 * via `isSomeSelected` / `isAllSubRowsSelected` (compared but read by the cells
 * off `row`, so they need no destructuring here).
 */
export const VirtualizedTableRow = memo(function VirtualizedTableRow({
  canExpand,
  canSelect,
  isExpanded,
  isGrouped,
  isPreview,
  isSelected,
  measureElement,
  row,
  rowIndex,
}: VirtualizedTableRowProps): JSX.Element {
  return (
    <StyledTableRow
      canExpand={canExpand}
      canSelect={canSelect}
      data-index={rowIndex}
      isExpanded={isExpanded}
      isGrouped={isGrouped}
      isPreview={isPreview}
      isSelected={isSelected}
      onClick={() => handleToggleExpanded(row)}
      ref={measureElement}
    >
      {row.getVisibleCells().map((cell, i) => {
        if (cell.getIsAggregated()) return null; // Display of aggregated cells is currently not supported.
        if (cell.getIsPlaceholder()) return null; // Display of placeholder cells is currently not supported.
        return (
          <TableCell
            data-testid={
              rowIndex === 0 && i === 0 ? TEST_IDS.TABLE_FIRST_CELL : undefined
            }
            key={cell.id}
            align={getTableCellAlign(cell.column)}
            padding={getTableCellPadding(cell.column.id)}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </StyledTableRow>
  );
});
