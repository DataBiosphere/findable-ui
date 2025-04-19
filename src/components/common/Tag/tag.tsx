import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../styles/common/mui/typography";

export interface TagProps {
  children: ReactNode;
  className?: string;
}

export const Tag = ({ children, className }: TagProps): JSX.Element => {
  return (
    <Typography
      className={className}
      component="span"
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_500}
    >
      {children}
    </Typography>
  );
};
