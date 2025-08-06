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
      color={TYPOGRAPHY_PROPS.COLOR.INK_MAIN}
      component="h3"
      variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_LARGE_500}
    >
      {title}
    </Typography>
  );
};
