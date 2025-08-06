import { Typography } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";

export interface SidebarLabelProps {
  label: string;
}

export const SidebarLabel = ({ label }: SidebarLabelProps): JSX.Element => {
  return (
    <Typography
      component="div"
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}
    >
      {label}
    </Typography>
  );
};
