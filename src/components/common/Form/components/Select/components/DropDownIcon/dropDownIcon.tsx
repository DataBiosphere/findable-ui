import { ArrowDropDownRounded } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";
import { JSX } from "react";

export const DropDownIcon = ({
  ...props /* MuiSvgIconProps */
}: SvgIconProps): JSX.Element => {
  return <ArrowDropDownRounded color="inkMain" fontSize="small" {...props} />;
};
