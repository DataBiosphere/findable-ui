import { Grid2 } from "@mui/material";
import React from "react";
import { Entity } from "../Entity/entity";
import { GRID2_PROPS } from "./constants";
import { ClassesProps } from "./types";

export const Entities = ({ classes, spacing }: ClassesProps): JSX.Element => {
  return (
    <Grid2 {...GRID2_PROPS}>
      {classes.map((classData) => (
        <Entity key={classData.key} class={classData} spacing={spacing} />
      ))}
    </Grid2>
  );
};
