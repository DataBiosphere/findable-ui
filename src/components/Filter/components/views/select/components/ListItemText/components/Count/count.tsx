import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../../styles/common/mui/typography";
import { BaseComponentProps, TestIdProps } from "../../../../../../../../types";

export const Count = ({
  className,
  testId,
  ...props /* MuiTypographyProps */
}: BaseComponentProps & TestIdProps & TypographyProps): JSX.Element => {
  return (
    <Typography
      className={className}
      color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
      data-testid={testId}
      variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_SMALL_400}
      {...props}
    />
  );
};
