import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import React from "react";

export const DropDownIcon = ({
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}): JSX.Element => {
  return (
    <ArrowDropDownRoundedIcon color="inkMain" fontSize="small" {...props} />
  );
};
