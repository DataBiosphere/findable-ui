import { SvgIconProps, TooltipProps } from "@mui/material";

/**
 * Props for the Icon component.
 */
export interface IconProps {
  slotProps?: {
    svgIcon?: SvgIconProps;
    tooltip?: Omit<TooltipProps, "children">;
  };
}
