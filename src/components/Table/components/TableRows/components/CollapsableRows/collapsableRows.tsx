import { TableRow as MTableRow } from "@mui/material";
import { Row, Table } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import React, { Fragment } from "react";
import { isCollapsableRowDisabled } from "../../../../common/utils";
import { CollapsableCell } from "../../../TableCell/components/CollapsableCell/collapsableCell";

export interface CollapsableRowsProps<T> {
  tableInstance: Table<T>;
  virtualizer: Virtualizer<Window, Element>;
}

export const CollapsableRows = <T extends object>({
  tableInstance,
  virtualizer,
}: CollapsableRowsProps<T>): JSX.Element => {
  const { getRowModel } = tableInstance;
  const { rows } = getRowModel();
  const virtualItems = virtualizer.getVirtualItems();
  return (
    <Fragment>
      {virtualItems.map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<T>;
        return (
          <MTableRow
            key={row.id}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
          >
            <CollapsableCell
              isDisabled={isCollapsableRowDisabled(tableInstance)}
              row={row}
            />
          </MTableRow>
        );
      })}
    </Fragment>
  );
};
