import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";

export const CategoryLabel = ({
  children,
}: TypographyProps): JSX.Element | null => {
  if (!children) return null;
  return (
    <Typography
      color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
      component="div"
      variant={TYPOGRAPHY_PROPS.VARIANT.UPPERCASE_500}
    >
      {children}
    </Typography>
  );
};
