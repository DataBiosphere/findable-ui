import { SvgIcon } from "@mui/material";
import type { JSX } from "react";
import type { CustomSVGIconProps } from "../../../../components/common/CustomIcon/common/entities";

/**
 * Custom required icon: an empty circle.
 * @param props - Icon props.
 * @param props.fontSize - Icon font size; defaults to "xsmall".
 * @param props.viewBox - SVG view box; defaults to "0 0 20 20".
 * @returns The required icon.
 */
export const RequiredIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 20 20",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <circle
        cx="10"
        cy="10"
        fill="transparent"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
      />
    </SvgIcon>
  );
};
