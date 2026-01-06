import { TableCell } from "@mui/material";
import { flexRender, Row, RowData } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import { Fragment, JSX } from "react";
import { TEST_IDS } from "../../../../tests/testIds";
import {
  getTableCellAlign,
  getTableCellPadding,
} from "../TableCell/common/utils";
import { handleToggleExpanded } from "../TableFeatures/RowExpanding/utils";
import { StyledTableRow } from "../TableRow/tableRow.styles";

export interface TableRowsProps<T extends RowData> {
  rows: Row<T>[];
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}

export const TableRows = <T extends RowData>({
  rows,
  virtualizer,
}: TableRowsProps<T>): JSX.Element => {
  const virtualItems = virtualizer.getVirtualItems();
  return (
    <Fragment>
      {virtualItems.map((virtualRow) => {
        const rowIndex = virtualRow.index;
        const row = rows[rowIndex] as Row<T>;
        const { getCanExpand, getIsExpanded, getIsGrouped, getIsPreview } = row;
        return (
          <StyledTableRow
            key={row.id}
            canExpand={getCanExpand()}
            canSelect={row.getCanSelect()}
            data-index={rowIndex}
            isExpanded={getIsExpanded()}
            isGrouped={getIsGrouped()}
            isPreview={getIsPreview()}
            isSelected={row.getIsSelected()}
            onClick={() => handleToggleExpanded(row)}
            ref={virtualizer.measureElement}
          >
            {row.getVisibleCells().map((cell, i) => {
              if (cell.getIsAggregated()) return null; // Display of aggregated cells is currently not supported.
              if (cell.getIsPlaceholder()) return null; // Display of placeholder cells is currently not supported.
              return (
                <TableCell
                  data-testid={
                    rowIndex === 0 && i === 0
                      ? TEST_IDS.TABLE_FIRST_CELL
                      : undefined
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
      })}
    </Fragment>
  );
};
