import { Row, RowData } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import { Fragment, JSX } from "react";
import { VirtualizedTableRow } from "../TableRow/components/VirtualizedTableRow/virtualizedTableRow";

export interface TableRowsProps<T extends RowData> {
  rows: Row<T>[];
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}

export const TableRows = <T extends RowData>({
  rows,
  virtualizer,
}: TableRowsProps<T>): JSX.Element => {
  const virtualItems = virtualizer.getVirtualItems();
  return (
    <Fragment>
      {virtualItems.map((virtualRow) => {
        const rowIndex = virtualRow.index;
        const row = rows[rowIndex] as Row<T>;
        return (
          <VirtualizedTableRow
            key={row.id}
            canExpand={row.getCanExpand()}
            canSelect={row.getCanSelect()}
            cells={row.getVisibleCells()}
            isAllSubRowsSelected={row.getIsAllSubRowsSelected()}
            isExpanded={row.getIsExpanded()}
            isGrouped={row.getIsGrouped()}
            isPreview={row.getIsPreview()}
            isSelected={row.getIsSelected()}
            isSomeSelected={row.getIsSomeSelected()}
            measureElement={virtualizer.measureElement}
            row={row}
            rowIndex={rowIndex}
          />
        );
      })}
    </Fragment>
  );
};
