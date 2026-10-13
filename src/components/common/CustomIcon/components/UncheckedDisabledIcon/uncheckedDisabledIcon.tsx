import { SvgIcon, SvgIconProps } from "@mui/material";
import { JSX } from "react";
import { PALETTE } from "../../../../../styles/common/constants/palette";

/**
 * Custom unchecked disabled icon.
 * @param props - Icon props.
 * @param props.fontSize - Icon font size; defaults to "xsmall".
 * @param props.viewBox - SVG view box; defaults to "0 0 18 18".
 * @returns The unchecked disabled icon.
 */
export const UncheckedDisabledIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props
}: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M4 0.5H14C15.933 0.5 17.5 2.067 17.5 4V14C17.5 15.933 15.933 17.5 14 17.5H4C2.067 17.5 0.5 15.933 0.5 14V4C0.5 2.067 2.067 0.5 4 0.5Z"
        stroke={PALETTE.SMOKE_MAIN}
      />
      <rect
        x="0.5"
        y="0.5"
        width="17"
        height="17"
        rx="3.5"
        fill={PALETTE.SMOKE_LIGHT}
        stroke={PALETTE.SMOKE_MAIN}
      />
    </SvgIcon>
  );
};
