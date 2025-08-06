import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../styles/common/mui/typography";
import { BaseComponentProps } from "../../types";

export const Tag = ({
  className,
  ...props
}: BaseComponentProps & TypographyProps): JSX.Element => {
  return (
    <Typography
      className={className}
      component="span"
      variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_500}
      {...props}
    />
  );
};
