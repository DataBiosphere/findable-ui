import { Typography } from "@mui/material";
import React from "react";
import { SidebarLabel as Label } from "./sidebarLabel.styles";

export interface SidebarLabelProps {
  label: string;
}

export const SidebarLabel = ({ label }: SidebarLabelProps): JSX.Element => {
  return (
    <Label>
      <Typography variant="text-body-large-500">{label}</Typography>
    </Label>
  );
};
