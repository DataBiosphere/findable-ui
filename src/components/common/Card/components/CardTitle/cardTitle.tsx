import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

export const CardTitle = (props: TypographyProps): JSX.Element => {
  return (
    <Typography
      component="h4"
      variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_LARGE_500}
      {...props}
    />
  );
};
