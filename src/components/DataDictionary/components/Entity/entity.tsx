import { Grid2, Typography } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { AnchorLink } from "../../../common/AnchorLink/anchorLink";
import { useTable } from "../Table/hook";
import { Table } from "../Table/table";
import { GRID2_PROPS } from "./constants";
import { StyledTypography } from "./entity.styles";
import { EntityProps } from "./types";

export const Entity = ({
  class: classData,
  metrics,
}: EntityProps): JSX.Element => {
  const table = useTable(classData.attributes);
  return (
    <Grid2 {...GRID2_PROPS} rowGap={4}>
      <Grid2 {...GRID2_PROPS} rowGap={1}>
        <StyledTypography
          component="h3"
          id={classData.key}
          variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_HEADING_SMALL}
          {...metrics}
        >
          {classData.label} <AnchorLink anchorLink={classData.key} />
        </StyledTypography>
        <Typography
          color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
          component="div"
          variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2_LINES}
        >
          {classData.description}
        </Typography>
      </Grid2>
      <Table table={table} />
    </Grid2>
  );
};
