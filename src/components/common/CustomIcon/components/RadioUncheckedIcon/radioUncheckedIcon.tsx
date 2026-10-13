import { SvgIcon } from "@mui/material";
import { JSX } from "react";
import { CustomSVGIconProps } from "../../common/entities";

/**
 * Custom radio unchecked icon.
 * @param props - Icon props.
 * @param props.fontSize - Icon font size; defaults to "xsmall".
 * @param props.viewBox - SVG view box; defaults to "0 0 18 18".
 * @returns The radio unchecked icon.
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
