import { SvgIconProps, TooltipProps } from "@mui/material";

export interface IconProps {
  slotProps?: {
    svgIcon?: SvgIconProps;
    tooltip?: Omit<TooltipProps, "children">;
  };
}
