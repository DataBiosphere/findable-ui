import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { BaseComponentProps } from "../../../../../types";

export const Warning = ({
  children,
  className,
  ...props /* Mui TypographyOwnProps */
}: BaseComponentProps & TypographyProps): JSX.Element | null => {
  if (!children) return null;
  return (
    <Typography
      className={className}
      color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
      mt={6}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
      {...props}
    >
      {children}
    </Typography>
  );
};
