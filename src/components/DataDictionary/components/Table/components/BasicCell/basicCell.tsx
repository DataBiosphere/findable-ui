import { Typography } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { BasicCellProps } from "./types";

export const BasicCell = ({ getValue }: BasicCellProps): JSX.Element => {
  return (
    <Typography variant={TYPOGRAPHY_PROPS.VARIANT.INHERIT}>
      {getValue()}
    </Typography>
  );
};
