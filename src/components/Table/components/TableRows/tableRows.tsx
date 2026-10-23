import { Row, RowData } from "@tanstack/react-table";
import { Fragment, JSX } from "react";
import type { TableVirtualizer } from "../../hooks/UseVirtualization/types";
import { VirtualizedTableRow } from "../TableRow/components/VirtualizedTableRow/virtualizedTableRow";

/**
 * Props for the TableRows component.
 */
export interface TableRowsProps<T extends RowData> {
  rows: Row<T>[];
  virtualizer: TableVirtualizer;
}

/**
 * Table rows for the virtualizer's current virtual items.
 * @param props - Component props.
 * @param props.rows - Rows to virtualize.
 * @param props.virtualizer - Row virtualizer.
 * @returns The table rows.
 */
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
