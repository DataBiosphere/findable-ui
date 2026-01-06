import { TableContainer } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { useBreakpoint } from "../../../../hooks/useBreakpoint";
import { TableBody } from "../../../Detail/components/Table/components/TableBody/tableBody";
import { ROW_DIRECTION } from "../../../Table/common/entities";
import { TableHead } from "../../../Table/components/TableHead/tableHead";
import { GridTable } from "../../../Table/table.styles";
import { getColumnTrackSizing } from "../../../TableCreator/options/columnTrackSizing/utils";
import { StyledFluidPaper } from "./table.styles";
import { TableProps } from "./types";

export const Table = <T extends RowData>({
  row,
  table,
}: TableProps<T>): JSX.Element => {
  const { smDown } = useBreakpoint();
  const rowDirection = smDown ? ROW_DIRECTION.VERTICAL : ROW_DIRECTION.DEFAULT;
  return (
    <StyledFluidPaper elevation={0}>
      <TableContainer>
        <GridTable
          collapsable
          gridTemplateColumns={getColumnTrackSizing(
            table.getVisibleFlatColumns(),
          )}
        >
          <TableHead tableInstance={table} />
          <TableBody
            rowDirection={rowDirection}
            rows={row.getLeafRows()}
            tableInstance={table}
          />
        </GridTable>
      </TableContainer>
    </StyledFluidPaper>
  );
};
