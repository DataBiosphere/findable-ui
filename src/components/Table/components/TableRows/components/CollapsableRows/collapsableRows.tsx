import { Row, RowData, Table } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import React, { Fragment } from "react";
import { isCollapsableRowDisabled } from "../../../../common/utils";
import { CollapsableCell } from "../../../TableCell/components/CollapsableCell/collapsableCell";
import { TableRow } from "../../../TableRow/tableRow.styles";

export interface CollapsableRowsProps<T extends RowData> {
  tableInstance: Table<T>;
  virtualizer: Virtualizer<Window, Element>;
}

export const CollapsableRows = <T extends RowData>({
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
        const { getIsPreview } = row;
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
            />
          </TableRow>
        );
      })}
    </Fragment>
  );
};
