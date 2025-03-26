import { SvgIcon, Tooltip } from "@mui/material";
import React from "react";
import { SVG_ICON_PROPS, TOOLTIP_PROPS } from "./constants";
import { IconProps } from "./types";

export const Icon = ({ slotProps }: IconProps): JSX.Element | null => {
  if (!slotProps?.tooltip?.title) return null;
  return (
    <Tooltip {...TOOLTIP_PROPS} {...slotProps?.tooltip}>
      <SvgIcon {...SVG_ICON_PROPS} {...slotProps?.svgIcon} />
    </Tooltip>
  );
};
