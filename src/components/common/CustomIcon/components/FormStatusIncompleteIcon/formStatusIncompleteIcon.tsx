import { SvgIcon } from "@mui/material";
import { JSX } from "react";
import { CustomSVGIconProps } from "../../common/entities";

/**
 * Custom form status incomplete icon.
 */

export const FormStatusIncompleteIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <rect
        fill="transparent"
        height="16"
        rx="8"
        stroke="currentColor"
        strokeWidth="2"
        width="16"
        x="1"
        y="1"
      />
    </SvgIcon>
  );
};
