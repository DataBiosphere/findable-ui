import {
  Tooltip as MTooltip,
  TooltipProps as MTooltipProps,
} from "@mui/material";
import React from "react";

export const Tooltip = ({ children, ...props }: MTooltipProps): JSX.Element => {
  return (
    <MTooltip arrow placement="top" {...props}>
      <div>{children}</div>
    </MTooltip>
  );
};
