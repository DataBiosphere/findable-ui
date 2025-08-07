import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../../styles/common/mui/typography";
import { BaseComponentProps, TestIdProps } from "../../../../../../../../types";

export const Term = ({
  className,
  testId,
  ...props /* MuiTypographyProps */
}: BaseComponentProps & TestIdProps & TypographyProps): JSX.Element => {
  return (
    <Typography
      className={className}
      data-testid={testId}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
      {...props}
    />
  );
};
