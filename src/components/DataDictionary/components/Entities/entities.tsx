import { Grid } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { Attribute } from "../../../../common/entities";
import { Entity } from "../Entity/entity";
import { GRID_PROPS } from "./constants";
import { ClassesProps } from "./types";

export const Entities = <T extends RowData = Attribute>({
  spacing,
  table,
}: ClassesProps<T>): JSX.Element => {
  const { getGroupedRowModel } = table;
  return (
    <Grid {...GRID_PROPS}>
      {/* Render grouped rows where each "group" is a class e.g. "donor" */}
      {getGroupedRowModel().rows.map((row) => (
        <Entity key={row.id} row={row} spacing={spacing} table={table} />
      ))}
    </Grid>
  );
};
