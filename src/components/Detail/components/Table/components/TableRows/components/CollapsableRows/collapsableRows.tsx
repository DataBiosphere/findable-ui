import { TableRow } from "@mui/material";
import { Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { v4 as uuid4 } from "uuid";
import { isCollapsableRowDisabled } from "../../../../../../../Table/common/utils";
import { CollapsableCell } from "../../../../../../../Table/components/TableCell/components/CollapsableCell/collapsableCell";

export interface CollapsableRowsProps<T> {
  tableInstance: Table<T>;
}

export const CollapsableRows = <T extends object>({
  tableInstance,
}: CollapsableRowsProps<T>): JSX.Element => {
  const { getRowModel } = tableInstance;
  const { rows } = getRowModel();
  const uuid = uuid4(); // Generate a unique ID for the collapsable rows.
  return (
    <Fragment>
      {rows.map((row) => {
        if (row.depth > 0) return null; // Hide sub rows.
        return (
          <TableRow key={`${uuid}${row.id}`}>
            <CollapsableCell
              isDisabled={isCollapsableRowDisabled(tableInstance)}
              row={row}
            />
          </TableRow>
        );
      })}
    </Fragment>
  );
};
