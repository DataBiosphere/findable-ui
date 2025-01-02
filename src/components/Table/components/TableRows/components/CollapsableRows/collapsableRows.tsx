import { Row, RowData, Table } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import React, { Fragment } from "react";
import { isCollapsableRowDisabled } from "../../../../common/utils";
import { CollapsableCell } from "../../../TableCell/components/CollapsableCell/collapsableCell";
import { TableRow } from "../../../TableRow/tableRow.styles";
import { useCollapsableRows } from "./hook";

export interface CollapsableRowsProps<T extends RowData> {
  tableInstance: Table<T>;
  virtualizer: Virtualizer<Window, Element>;
}

export const CollapsableRows = <T extends RowData>({
  tableInstance,
  virtualizer,
}: CollapsableRowsProps<T>): JSX.Element => {
  const { getRowModel, getState } = tableInstance;
  const { rows } = getRowModel();
  const { grouping } = getState();
  const virtualItems = virtualizer.getVirtualItems();
  useCollapsableRows(tableInstance);
  return (
    <Fragment>
      {virtualItems.map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<T>;
        const { getIsPreview } = row;
        if (grouping.length > 0 && row.depth > 0) return null; // TODO(cc) hide sub rows -- sub-rows are within collapsed content -- UI TBD.
        return (
          <TableRow
            key={row.id}
            data-index={virtualRow.index}
            isPreview={getIsPreview()}
            ref={virtualizer.measureElement}
          >
            <CollapsableCell
              isDisabled={isCollapsableRowDisabled(tableInstance)}
              row={row}
              virtualizer={virtualizer}
            />
          </TableRow>
        );
      })}
    </Fragment>
  );
};
