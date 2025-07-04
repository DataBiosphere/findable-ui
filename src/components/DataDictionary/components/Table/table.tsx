import { TableContainer } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { TableBody } from "../../../Detail/components/Table/components/TableBody/tableBody";
import { ROW_DIRECTION } from "../../../Table/common/entities";
import { TableHead } from "../../../Table/components/TableHead/tableHead";
import { GridTable } from "../../../Table/table.styles";
import { getColumnTrackSizing } from "../../../TableCreator/options/columnTrackSizing/utils";
import { RoundedPaper } from "../../../common/Paper/components/RoundedPaper/roundedPaper";
import { GridPaper } from "../../../common/Paper/paper.styles";
import { TableProps } from "./types";

export const Table = <T extends RowData>({
  row,
  table,
}: TableProps<T>): JSX.Element => {
  return (
    <RoundedPaper elevation={0}>
      <GridPaper>
        <TableContainer>
          <GridTable
            gridTemplateColumns={getColumnTrackSizing(
              table.getVisibleFlatColumns()
            )}
          >
            <TableHead
              rowDirection={ROW_DIRECTION.DEFAULT}
              tableInstance={table}
            />
            <TableBody
              rowDirection={ROW_DIRECTION.DEFAULT}
              rows={row.getLeafRows()}
              tableInstance={table}
            />
          </GridTable>
        </TableContainer>
      </GridPaper>
    </RoundedPaper>
  );
};
