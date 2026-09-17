import { Row, RowData, Table } from "@tanstack/react-table";
import { Fragment, JSX } from "react";
import { isCollapsableRowDisabled } from "../../../../../../../Table/common/utils";
import { CollapsableCell } from "../../../../../../../Table/components/TableCell/components/CollapsableCell/collapsableCell";
import { StyledTableRow } from "../../../../../../../Table/components/TableRow/tableRow.styles";
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
  // Filter before mapping so the position passed to each cell counts only the
  // rows actually rendered; a mini-table's sub rows then number from one.
  const visibleRows = leafOrSubRows || rows.filter((row) => row.depth === 0); // Hide sub rows that are not already leaf or sub rows.
  return (
    <Fragment>
      {visibleRows.map((row, position) => (
        <StyledTableRow
          key={row.id}
          id={row.id}
          isPreview={row.getIsPreview()}
          isSelected={row.getIsSelected()}
        >
          <CollapsableCell
            isDisabled={isCollapsableRowDisabled(tableInstance)}
            position={position}
            row={row}
          />
        </StyledTableRow>
      ))}
    </Fragment>
  );
};
