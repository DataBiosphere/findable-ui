import { SvgIcon } from "@mui/material";
import React from "react";
import { CustomSVGIconProps } from "../../common/entities";

/**
 * Custom radio unchecked icon.
 */

export const RadioUncheckedIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <rect
        fill="transparent"
        height="17"
        rx="8.5"
        stroke="currentColor"
        x="0.5"
        y="0.5"
        width="17"
      />
    </SvgIcon>
  );
};
