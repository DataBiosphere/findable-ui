import { RowData, Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { isCollapsableRowDisabled } from "../../../../../../../Table/common/utils";
import { CollapsableCell } from "../../../../../../../Table/components/TableCell/components/CollapsableCell/collapsableCell";
import { TableRow } from "../../../../../../../Table/components/TableRow/tableRow.styles";
import { useCollapsableRows } from "../../../../../../../Table/components/TableRows/components/CollapsableRows/hook";

export interface CollapsableRowsProps<T extends RowData> {
  tableInstance: Table<T>;
}

export const CollapsableRows = <T extends RowData>({
  tableInstance,
}: CollapsableRowsProps<T>): JSX.Element => {
  const { getRowModel } = tableInstance;
  const { rows } = getRowModel();
  useCollapsableRows(tableInstance);
  return (
    <Fragment>
      {rows.map((row) => {
        if (row.depth > 0) return null; // Hide sub rows.
        return (
          <TableRow key={row.id} isPreview={row.getIsPreview()}>
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
