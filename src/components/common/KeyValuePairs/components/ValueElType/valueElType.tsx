import { Typography, TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

/**
 * Basic KeyValuePairs "value" wrapper component.
 * @param props - Typography props.
 * @param props.children - Value content.
 * @param props.component - Root element; defaults to "div".
 * @param props.variant - Typography variant; defaults to "body-400-2lines".
 * @returns The value wrapper.
 */
export const ValueElType = ({
  children,
  component = "div",
  variant = TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES,
  ...props /* MuiTypographyProps */
}: TypographyProps): JSX.Element => {
  return (
    <Typography component={component} variant={variant} {...props}>
      {children}
    </Typography>
  );
};
