import { ArrowDropDownRounded } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";
import { JSX } from "react";

/**
 * Renders the small, ink main dropdown arrow icon.
 * @param props - SVG icon props.
 * @returns The dropdown icon.
 */
export const DropDownIcon = ({
  ...props /* MuiSvgIconProps */
}: SvgIconProps): JSX.Element => {
  return <ArrowDropDownRounded color="inkMain" fontSize="small" {...props} />;
};
