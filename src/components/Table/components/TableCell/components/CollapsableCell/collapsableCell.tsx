import { Collapse, IconButton, Typography } from "@mui/material";
import { Cell, flexRender, Row, RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { UnfoldMoreIcon } from "../../../../../common/CustomIcon/components/UnfoldMoreIcon/unfoldMoreIcon";
import { getPinnedCellIndex } from "../../../../common/utils";
import {
  CollapsedContents,
  Content,
  PinnedCell,
  TableCell,
} from "./collapsableCell.styles";
import { getToggleLabel } from "./utils";

export interface CollapsableCellProps<T extends RowData> {
  isDisabled?: boolean;
  /**
   * Zero-based position of the row among the rows being rendered; numbers the
   * toggle's accessible name. Defaults to `row.index`, which is only correct
   * for a flat, unsorted table rendered in full — callers that render a subset,
   * nested rows, or a sorted view should pass their own map index.
   */
  position?: number;
  row: Row<T>;
}

export const CollapsableCell = <T extends RowData>({
  isDisabled = false,
  position,
  row,
}: CollapsableCellProps<T>): JSX.Element => {
  const [pinnedCell, pinnedIndex] = getPinnedCellIndex(row);
  const isExpanded = row.getIsExpanded();
  return (
    <TableCell isExpanded={isExpanded}>
      <PinnedCell>
        {flexRender(pinnedCell.column.columnDef.cell, pinnedCell.getContext())}
        <IconButton
          // Omitted while disabled: the row cannot open, so advertising a
          // disclosure state would describe an interaction that is not offered.
          aria-expanded={isDisabled ? undefined : isExpanded}
          aria-label={getToggleLabel(position ?? row.index)}
          color="ink"
          disabled={isDisabled}
          edge="end"
          onClick={() => row.toggleExpanded()}
          size="large"
        >
          <UnfoldMoreIcon fontSize="small" />
        </IconButton>
      </PinnedCell>
      <Collapse in={isExpanded}>
        <CollapsedContents>
          {getRowVisibleCells(row).map((cell, i) => {
            if (cell.getIsAggregated()) return null; // Display of aggregated cells is currently not supported.
            if (cell.getIsPlaceholder()) return null; // Display of placeholder cells is currently not supported.
            const header = cell.column.columnDef.meta?.header;
            return (
              i !== pinnedIndex && (
                <Content key={cell.id}>
                  {header && (
                    <Typography
                      color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
                      component="div"
                      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES}
                    >
                      {header}
                    </Typography>
                  )}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Content>
              )
            );
          })}
        </CollapsedContents>
      </Collapse>
    </TableCell>
  );
};

/**
 * Returns row or sub row visible cells.
 * @param row - Row.
 * @returns row or sub row visible cells.
 */
function getRowVisibleCells<T extends RowData>(
  row: Row<T>,
): Cell<T, unknown>[] {
  if (row.getIsGrouped()) {
    return row.subRows.map(({ getVisibleCells }) => getVisibleCells()).flat();
  }
  return row.getVisibleCells();
}
