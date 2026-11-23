import { TableCell } from "@mui/material";
import { flexRender, RowData } from "@tanstack/react-table";
import { JSX, memo } from "react";
import { TEST_IDS } from "../../../../../../tests/testIds";
import {
  getColumnCellPadding,
  getTableCellAlign,
  getTableCellContentMaxWidth,
} from "../../../TableCell/common/utils";
import { ClampedContent } from "../../../TableCell/components/ClampedContent/clampedContent";
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
 * off `row`, so they need no destructuring here). `cells` is
 * `row.getVisibleCells()` passed from the parent so column-visibility toggles
 * are detected too — those change the cell set without changing `row` or any
 * of the state booleans.
 *
 * `memo` erases the generic type parameter, so the export is cast back to a
 * generic function type to preserve `Row<T>` inference at the call site.
 */
export const VirtualizedTableRow = memo(function VirtualizedTableRow<
  T extends RowData,
>({
  canExpand,
  canSelect,
  cells,
  isExpanded,
  isGrouped,
  isPreview,
  isSelected,
  measureElement,
  row,
  rowIndex,
}: VirtualizedTableRowProps<T>): JSX.Element {
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
      {cells.map((cell, i) => {
        if (cell.getIsAggregated()) return null; // Display of aggregated cells is currently not supported.
        if (cell.getIsPlaceholder()) return null; // Display of placeholder cells is currently not supported.
        const content = flexRender(
          cell.column.columnDef.cell,
          cell.getContext(),
        );
        const contentMaxWidth = getTableCellContentMaxWidth(cell.column);
        const clampedContent = (
          <ClampedContent maxLines={cell.column.columnDef.meta?.maxLines}>
            {content}
          </ClampedContent>
        );
        return (
          <TableCell
            data-testid={
              rowIndex === 0 && i === 0 ? TEST_IDS.TABLE_FIRST_CELL : undefined
            }
            key={cell.id}
            align={getTableCellAlign(cell.column)}
            padding={getColumnCellPadding(cell.column)}
          >
            {contentMaxWidth ? (
              <div style={{ maxWidth: contentMaxWidth, width: "max-content" }}>
                {clampedContent}
              </div>
            ) : (
              clampedContent
            )}
          </TableCell>
        );
      })}
    </StyledTableRow>
  );
}) as <T extends RowData>(props: VirtualizedTableRowProps<T>) => JSX.Element;
