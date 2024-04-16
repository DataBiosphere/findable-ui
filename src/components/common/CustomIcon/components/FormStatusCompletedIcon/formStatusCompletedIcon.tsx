import { SvgIcon } from "@mui/material";
import React from "react";
import { CustomSVGIconProps } from "../../common/entities";

/**
 * Custom form status completed icon.
 */

export const FormStatusCompletedIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <rect width="18" height="18" rx="9" fill="currentColor" />
      <path
        d="M7.58521 12.2524C7.50727 12.2524 7.43191 12.2377 7.35911 12.2083C7.28631 12.1794 7.21584 12.1309 7.14771 12.0627L4.68301 9.59805C4.56634 9.48138 4.51057 9.33321 4.51571 9.15355C4.52037 8.97341 4.58104 8.82501 4.69771 8.70835C4.81437 8.59168 4.96021 8.53335 5.13521 8.53335C5.31021 8.53335 5.45604 8.59168 5.57271 8.70835L7.61461 10.7502L12.4418 5.92305C12.5585 5.80638 12.7017 5.74805 12.8716 5.74805C13.0419 5.74805 13.1854 5.80638 13.3021 5.92305C13.4188 6.03971 13.4771 6.18321 13.4771 6.35355C13.4771 6.52341 13.4188 6.66668 13.3021 6.78335L8.02271 12.0627C7.95457 12.1309 7.88411 12.1794 7.81131 12.2083C7.73851 12.2377 7.66314 12.2524 7.58521 12.2524Z"
        fill="white"
      />
    </SvgIcon>
  );
};
