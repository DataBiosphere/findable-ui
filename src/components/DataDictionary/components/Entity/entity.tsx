import { Grid2, Typography } from "@mui/material";
import React from "react";
import { COLOR, VARIANT } from "../../../../styles/common/mui/typography";
import { useTable } from "../Table/hook";
import { Table } from "../Table/table";
import { GRID2_PROPS } from "./constants";
import { EntityProps } from "./types";

export const Entity = ({ class: classData }: EntityProps): JSX.Element => {
  const table = useTable(classData.attributes);
  return (
    <Grid2 {...GRID2_PROPS} rowGap={4}>
      <Grid2 {...GRID2_PROPS} rowGap={1}>
        <Typography component="h3" variant={VARIANT.TEXT_HEADING_SMALL}>
          {classData.label}
        </Typography>
        <Typography
          color={COLOR.INK_LIGHT}
          component="div"
          variant={VARIANT.TEXT_BODY_400_2_LINES}
        >
          {classData.description}
        </Typography>
      </Grid2>
      <Table table={table} />
    </Grid2>
  );
};
