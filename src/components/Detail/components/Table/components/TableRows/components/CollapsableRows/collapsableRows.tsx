import { Row, RowData, Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { isCollapsableRowDisabled } from "../../../../../../../Table/common/utils";
import { CollapsableCell } from "../../../../../../../Table/components/TableCell/components/CollapsableCell/collapsableCell";
import { TableRow } from "../../../../../../../Table/components/TableRow/tableRow.styles";
import { useCollapsableRows } from "../../../../../../../Table/components/TableRows/components/CollapsableRows/hook";

export interface CollapsableRowsProps<T extends RowData> {
  /**
   * Optional override for the rows rendered by <CollapsableRows>.
   * - Omit to show the table’s full leaf-level row model.
   * - Pass `group.subRows` (or any other subset) to display a “mini-table” for a single group e.g. the rows that belong to one Data-Dictionary entity.
   */
  rows?: Row<T>[];
  tableInstance: Table<T>;
}

export const CollapsableRows = <T extends RowData>({
  rows: leafOrSubRows,
  tableInstance,
}: CollapsableRowsProps<T>): JSX.Element => {
  const { getRowModel } = tableInstance;
  const { rows } = getRowModel();
  useCollapsableRows(tableInstance);
  return (
    <Fragment>
      {(leafOrSubRows || rows).map((row) => {
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
