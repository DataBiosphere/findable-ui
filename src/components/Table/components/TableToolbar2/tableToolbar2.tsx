import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { TableDownload } from "../TableFeatures/TableDownload/tableDownload";
import { StyledStack, StyledToolbar } from "./tableToolbar2.styles";
import { TableToolbar2Props } from "./types";

/**
 * Table toolbar with the table download control.
 * @param props - Component props.
 * @param props.table - TanStack table instance.
 * @returns The table toolbar.
 */
export const TableToolbar2 = <T extends RowData>({
  table,
}: TableToolbar2Props<T>): JSX.Element => {
  return (
    <StyledToolbar>
      <StyledStack>
        <TableDownload table={table} />
      </StyledStack>
    </StyledToolbar>
  );
};
