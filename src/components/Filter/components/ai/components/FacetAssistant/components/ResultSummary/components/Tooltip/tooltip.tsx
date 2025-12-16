import { Tooltip as MTooltip } from "@mui/material";
import React from "react";
import { TOOLTIP_PROPS } from "./constants";
import { useMeasuredWidth } from "./hook";
import { TooltipProps } from "./types";

export const Tooltip = ({ children, ...props }: TooltipProps): JSX.Element => {
  const [minWidth = "unset", ref] = useMeasuredWidth<HTMLSpanElement>();
  return (
    <MTooltip
      {...TOOLTIP_PROPS}
      slotProps={{
        ...TOOLTIP_PROPS.slotProps,
        popper: { sx: { minWidth } },
      }}
      {...props}
    >
      {children(ref)}
    </MTooltip>
  );
};
