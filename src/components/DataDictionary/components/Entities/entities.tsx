import { Grid } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { Attribute } from "../../../../common/entities";
import { Entity } from "../Entity/entity";
import { GRID_PROPS } from "./constants";
import { ClassesProps } from "./types";

export const Entities = <T extends RowData = Attribute>({
  classes,
  columnDefs,
  spacing,
}: ClassesProps<T>): JSX.Element => {
  return (
    <Grid {...GRID_PROPS}>
      {classes.map((cls) => (
        <Entity
          key={cls.name}
          class={cls}
          columnDefs={columnDefs}
          spacing={spacing}
        />
      ))}
    </Grid>
  );
};
