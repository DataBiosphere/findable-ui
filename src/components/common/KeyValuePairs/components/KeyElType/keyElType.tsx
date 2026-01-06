import { Typography, TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

/**
 * Basic KeyValuePairs "key" wrapper component.
 */

export const KeyElType = ({
  children,
  color = TYPOGRAPHY_PROPS.COLOR.INK_LIGHT,
  component = "div",
  variant = TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES,
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
