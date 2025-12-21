import { SvgIcon } from "@mui/material";
import { JSX } from "react";
import { CustomSVGIconProps } from "../../common/entities";

/**
 * Custom radio checked icon.
 */

export const RadioCheckedIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 18C13.9706 18 18 13.9707 18 9C18 4.0293 13.9706 0 9 0C4.02942 0 0 4.0293 0 9C0 13.9707 4.02942 18 9 18ZM9 13C11.2091 13 13 11.209 13 9C13 6.79102 11.2091 5 9 5C6.79089 5 5 6.79102 5 9C5 11.209 6.79089 13 9 13Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
