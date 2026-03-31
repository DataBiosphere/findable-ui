import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../styles/common/mui/typography";

export const KeyElType = ({
  children,
  color = TYPOGRAPHY_PROPS.COLOR.INK_LIGHT,
  component = "div",
  variant = TYPOGRAPHY_PROPS.VARIANT.INHERIT,
  ...props /* MuiTypographyProps */
}: TypographyProps): JSX.Element => {
  return (
    <Typography
      color={color}
      component={component}
      variant={variant}
      {...props}
    >
      {children}
    </Typography>
  );
};
