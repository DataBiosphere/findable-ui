import { SvgIconProps } from "@mui/material";

export interface CustomSVGIconProps extends SvgIconProps {
  fontSize?: SvgIconProps["fontSize"];
  viewBox?: string;
}
