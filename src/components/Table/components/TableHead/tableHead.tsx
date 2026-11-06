import { SouthRounded } from "@mui/icons-material";
import {
  TableHead as MTableHead,
  TableRow as MTableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";
import { flexRender, RowData } from "@tanstack/react-table";
import { Fragment, JSX, useContext } from "react";
import { Tooltip } from "../../../DataDictionary/components/Tooltip/tooltip";
import {
  getColumnCellPadding,
  getTableCellAlign,
} from "../TableCell/common/utils";
import { handleToggleSorting } from "../TableFeatures/RowSorting/utils";
import { TableHeadContext } from "./context";
import { TableHeadProps } from "./types";
import { isSortDisabled, shouldSortColumn } from "./utils";

/**
 * Table head, with a header row per header group and a cell per header whose column is not grouped.
 * Each header shows a tooltip of its column's annotation when the annotation has a description, and is a sort label when sorting interaction is enabled for the table and the column can sort.
 * @param props - Component props.
 * @param props.tableInstance - TanStack table instance.
 * @returns The table head.
 */
export const TableHead = <T extends RowData>({
  tableInstance,
}: TableHeadProps<T>): JSX.Element => {
  // The sort labels' tab index: -1 in the pinned copy of the head.
  const { tabIndex } = useContext(TableHeadContext);
  return (
    <Fragment>
      {tableInstance.getHeaderGroups().map((headerGroup) => (
        <MTableHead key={headerGroup.id}>
          <MTableRow>
            {headerGroup.headers.map(({ column, getContext, id }) => {
              const { columnDef, getIsGrouped, getIsSorted } = column;
              const annotation = columnDef.meta?.annotation;
              return getIsGrouped() ? null : (
                <TableCell
                  key={id}
                  align={getTableCellAlign(column)}
                  padding={getColumnCellPadding(column)}
                >
                  <Tooltip
                    description={annotation?.description}
                    title={annotation?.label}
                  >
                    {shouldSortColumn(tableInstance, column) ? (
                      <TableSortLabel
                        IconComponent={SouthRounded}
                        active={Boolean(getIsSorted())}
                        direction={getIsSorted() || undefined}
                        disabled={isSortDisabled(tableInstance)}
                        tabIndex={tabIndex}
                        onClick={(mouseEvent) =>
                          handleToggleSorting(mouseEvent, tableInstance, column)
                        }
                      >
                        {flexRender(columnDef.header, getContext())}
                      </TableSortLabel>
                    ) : (
                      flexRender(columnDef.header, getContext())
                    )}
                  </Tooltip>
                </TableCell>
              );
            })}
          </MTableRow>
        </MTableHead>
      ))}
    </Fragment>
  );
};
