import { TableContainer } from "@mui/material";
import React from "react";
import { TableBody } from "../../../Detail/components/Table/components/TableBody/tableBody";
import { ROW_DIRECTION } from "../../../Table/common/entities";
import { TableHead } from "../../../Table/components/TableHead/tableHead";
import { GridTable } from "../../../Table/table.styles";
import { getColumnTrackSizing } from "../../../TableCreator/options/columnTrackSizing/utils";
import { GridPaper, RoundedPaper } from "../../../common/Paper/paper.styles";
import { TableProps } from "./types";

export const Table = ({ table }: TableProps): JSX.Element => {
  return (
    <RoundedPaper>
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
              tableInstance={table}
            />
          </GridTable>
        </TableContainer>
      </GridPaper>
    </RoundedPaper>
  );
};
