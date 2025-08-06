import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

export const CardText = (props: TypographyProps): JSX.Element => {
  return (
    <Typography
      variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2_LINES}
      {...props}
    />
  );
};
