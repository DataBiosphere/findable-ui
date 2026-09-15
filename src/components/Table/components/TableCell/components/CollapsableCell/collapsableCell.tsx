import { Collapse, IconButton, Typography } from "@mui/material";
import { Cell, flexRender, Row, RowData } from "@tanstack/react-table";
import { JSX, useId } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { UnfoldMoreIcon } from "../../../../../common/CustomIcon/components/UnfoldMoreIcon/unfoldMoreIcon";
import { getPinnedCellIndex } from "../../../../common/utils";
import {
  CollapsedContents,
  Content,
  PinnedCell,
  TableCell,
  VisuallyHidden,
} from "./collapsableCell.styles";
import { ARIA_LABEL } from "./constants";

export interface CollapsableCellProps<T extends RowData> {
  isDisabled?: boolean;
  row: Row<T>;
}

export const CollapsableCell = <T extends RowData>({
  isDisabled = false,
  row,
}: CollapsableCellProps<T>): JSX.Element => {
  const [pinnedCell, pinnedIndex] = getPinnedCellIndex(row);
  const isExpanded = row.getIsExpanded();
  // Generated per instance: every row renders one of these, so shared ids would
  // leave every toggle in the table named after the first row.
  const identifierId = useId();
  const labelId = useId();
  return (
    <TableCell isExpanded={isExpanded}>
      <PinnedCell>
        {/*
         * Wrapped so the toggle can be named by the row identifier the user
         * actually reads. The pinned cell's rendered output is the only place
         * that text exists: the cell's accessor value routinely differs from it
         * — config-driven columns render through a view builder that digs into
         * the response — and naming the toggle after a value that appears
         * nowhere on screen is worse than not naming it at all.
         */}
        <div id={identifierId}>
          {flexRender(
            pinnedCell.column.columnDef.cell,
            pinnedCell.getContext(),
          )}
        </div>
        <IconButton
          // Omitted while disabled: the row cannot open, so advertising a
          // disclosure state would describe an interaction that is not offered.
          aria-expanded={isDisabled ? undefined : isExpanded}
          // The name is built from the hidden text and the row's identifier, in
          // that order, so every toggle says what it does and which row it
          // belongs to. It stays put across activation — aria-expanded is what
          // announces the state, and a name that changed on click would move
          // the target out from under anyone addressing the control by name.
          aria-labelledby={`${labelId} ${identifierId}`}
          color="ink"
          disabled={isDisabled}
          edge="end"
          onClick={() => row.toggleExpanded()}
          size="large"
        >
          <UnfoldMoreIcon fontSize="small" />
          <VisuallyHidden id={labelId}>{ARIA_LABEL.ROW_DETAILS}</VisuallyHidden>
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
