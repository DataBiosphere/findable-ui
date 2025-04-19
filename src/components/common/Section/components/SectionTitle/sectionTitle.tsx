import { Typography } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

export interface SectionTitleProps {
  className?: string;
  title: string;
}

export const SectionTitle = ({
  className,
  title,
}: SectionTitleProps): JSX.Element => {
  return (
    <Typography
      align="left"
      className={className}
      color="ink.main"
      component="h3"
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}
    >
      {title}
    </Typography>
  );
};
