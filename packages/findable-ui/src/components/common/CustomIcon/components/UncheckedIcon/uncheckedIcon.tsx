import { SvgIcon } from "@mui/material";
import React from "react";
import { CustomSVGIconProps } from "../../common/entities";

/**
 * Custom unchecked icon.
 */

export const UncheckedIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <rect
        fill="white"
        height="17"
        rx="3.5"
        stroke="currentColor"
        width="17"
        x="0.5"
        y="0.5"
      />
    </SvgIcon>
  );
};
