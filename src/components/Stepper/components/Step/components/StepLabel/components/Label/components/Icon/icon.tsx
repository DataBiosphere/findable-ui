import { SvgIcon, Tooltip } from "@mui/material";
import { JSX } from "react";
import { SVG_ICON_PROPS, TOOLTIP_PROPS } from "./constants";
import { IconProps } from "./types";

/**
 * Icon with a tooltip, shown next to a step label.
 * @param props - Component props.
 * @param props.slotProps - Props for the SVG icon and the tooltip.
 * @returns The icon, or null without a tooltip title.
 */
export const Icon = ({ slotProps }: IconProps): JSX.Element | null => {
  if (!slotProps?.tooltip?.title) return null;
  return (
    <Tooltip {...TOOLTIP_PROPS} {...slotProps?.tooltip}>
      <SvgIcon {...SVG_ICON_PROPS} {...slotProps?.svgIcon} />
    </Tooltip>
  );
};
