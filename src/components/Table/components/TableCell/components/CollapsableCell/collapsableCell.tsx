import { Collapse, IconButton, Typography } from "@mui/material";
import { Cell, flexRender, Row, RowData } from "@tanstack/react-table";
import React, { useState } from "react";
import { TEXT_BODY_400_2_LINES } from "../../../../../../theme/common/typography";
import { UnfoldMoreIcon } from "../../../../../common/CustomIcon/components/UnfoldMoreIcon/unfoldMoreIcon";
import { getPinnedCellIndex } from "../../../../common/utils";
import {
  CollapsedContents,
  Content,
  PinnedCell,
  TableCell,
} from "./collapsableCell.styles";

export interface CollapsableCellProps<T extends RowData> {
  isDisabled?: boolean;
  row: Row<T>;
}

export const CollapsableCell = <T extends RowData>({
  isDisabled = false,
  row,
}: CollapsableCellProps<T>): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [pinnedCell, pinnedIndex] = getPinnedCellIndex(row);

  // Toggles open/close table cell.
  const onToggleExpanded = (): void => {
    setIsExpanded((expanded) => !expanded);
  };

  return (
    <TableCell isExpanded={isExpanded}>
      <PinnedCell>
        {flexRender(pinnedCell.column.columnDef.cell, pinnedCell.getContext())}
        <IconButton
          color="ink"
          disabled={isDisabled}
          edge="end"
          onClick={onToggleExpanded}
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
                      component="div"
                      color="ink.light"
                      variant={TEXT_BODY_400_2_LINES}
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
  row: Row<T>
): Cell<T, unknown>[] {
  if (row.getIsGrouped()) {
    return row
      .getLeafRows()
      .map((leafRow) => leafRow.getVisibleCells())
      .flat();
  }
  return row.getVisibleCells();
}
