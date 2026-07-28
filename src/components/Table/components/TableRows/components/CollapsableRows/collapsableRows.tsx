import { Row, RowData, Table } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import { Fragment, JSX } from "react";
import { isCollapsableRowDisabled } from "../../../../common/utils";
import { CollapsableTableRow } from "../../../TableRow/components/CollapsableTableRow/collapsableTableRow";
import { useCollapsableRows } from "./hook";

export interface CollapsableRowsProps<T extends RowData> {
  rows: Row<T>[];
  tableInstance: Table<T>;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}

export const CollapsableRows = <T extends RowData>({
  rows,
  tableInstance,
  virtualizer,
}: CollapsableRowsProps<T>): JSX.Element => {
  useCollapsableRows(tableInstance);
  const { grouping } = tableInstance.getState();
  // Table-level, so compute once and pass to each row (a change re-renders all).
  const isDisabled = isCollapsableRowDisabled(tableInstance);
  const virtualItems = virtualizer.getVirtualItems();
  return (
    <Fragment>
      {virtualItems.map((virtualRow) => {
        const rowIndex = virtualRow.index;
        const row = rows[rowIndex] as Row<T>;
        if (grouping.length > 0 && row.depth > 0) return null; // TODO(cc) hide sub rows -- sub-rows are within collapsed content -- UI TBD.
        return (
          <CollapsableTableRow
            key={row.id}
            isDisabled={isDisabled}
            isExpanded={row.getIsExpanded()}
            isPreview={row.getIsPreview()}
            isSelected={row.getIsSelected()}
            measureElement={virtualizer.measureElement}
            row={row as Row<RowData>}
            rowIndex={rowIndex}
          />
        );
      })}
    </Fragment>
  );
};
