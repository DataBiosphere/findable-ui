import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { TableDownload } from "../TableFeatures/TableDownload/tableDownload";
import { StyledStack, StyledToolbar } from "./tableToolbar2.styles";
import { TableToolbar2Props } from "./types";

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
