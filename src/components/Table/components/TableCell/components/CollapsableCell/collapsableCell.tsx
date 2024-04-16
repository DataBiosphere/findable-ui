import { Collapse, IconButton, Typography } from "@mui/material";
import { flexRender, Row } from "@tanstack/react-table";
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

export interface CollapsableCellProps<T> {
  row: Row<T>;
}

export const CollapsableCell = <T extends object>({
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
          edge="end"
          onClick={onToggleExpanded}
          size="large"
        >
          <UnfoldMoreIcon fontSize="small" />
        </IconButton>
      </PinnedCell>
      <Collapse in={isExpanded}>
        <CollapsedContents>
          {row.getVisibleCells().map((cell, i) => {
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
