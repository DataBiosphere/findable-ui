import { Grid, Typography } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { Attribute } from "../../../../common/entities";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { AnchorLink } from "../../../common/AnchorLink/anchorLink";
import { useTable } from "../Table/hook";
import { Table } from "../Table/table";
import { GRID_PROPS } from "./constants";
import { StyledTypography } from "./entity.styles";
import { EntityProps } from "./types";

export const Entity = <T extends RowData = Attribute>({
  class: cls,
  columnDefs,
  spacing,
  tableOptions,
}: EntityProps<T>): JSX.Element => {
  const table = useTable<T>(cls.attributes, columnDefs, tableOptions);
  return (
    <Grid {...GRID_PROPS} rowGap={4}>
      <Grid {...GRID_PROPS} rowGap={1}>
        <StyledTypography
          component="h3"
          id={cls.name}
          variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_HEADING_SMALL}
          {...spacing}
        >
          {cls.title} <AnchorLink anchorLink={cls.name} />
        </StyledTypography>
        <Typography
          color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
          component="div"
          variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2_LINES}
        >
          {cls.description}
        </Typography>
      </Grid>
      <Table table={table} />
    </Grid>
  );
};
