import { Grid, Typography } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { Attribute } from "../../../../common/entities";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { AnchorLink } from "../../../common/AnchorLink/anchorLink";
import { Table } from "../Table/table";
import { GRID_PROPS } from "./constants";
import { StyledTypography } from "./entity.styles";
import { EntityProps } from "./types";
import { getClassMeta } from "./utils";

export const Entity = <T extends RowData = Attribute>({
  row,
  spacing,
  table,
}: EntityProps<T>): JSX.Element | null => {
  // Get class key from row.
  const classKey = row.getValue<string>("classKey");

  // Get class metadata from table options.
  const cls = getClassMeta<T>(classKey, table);

  // Class not found in table meta - return null.
  if (!cls) return null;

  return (
    <Grid {...GRID_PROPS} rowGap={4}>
      {/* Class title and description */}
      <Grid {...GRID_PROPS} rowGap={1}>
        <StyledTypography
          component="h3"
          id={classKey}
          variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_HEADING_SMALL}
          {...spacing}
        >
          {cls.title} <AnchorLink anchorLink={classKey} />
        </StyledTypography>
        <Typography
          color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
          component="div"
          variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2_LINES}
        >
          {cls.description}
        </Typography>
      </Grid>
      {/* Class attributes table */}
      <Table row={row} table={table} />
    </Grid>
  );
};
