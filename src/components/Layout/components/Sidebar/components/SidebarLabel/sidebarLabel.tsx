import { Typography } from "@mui/material";
import React from "react";
import { TEXT_BODY_LARGE_500 } from "../../../../../../theme/common/typography";

export interface SidebarLabelProps {
  label: string;
}

export const SidebarLabel = ({ label }: SidebarLabelProps): JSX.Element => {
  return (
    <Typography component="div" variant={TEXT_BODY_LARGE_500}>
      {label}
    </Typography>
  );
};
