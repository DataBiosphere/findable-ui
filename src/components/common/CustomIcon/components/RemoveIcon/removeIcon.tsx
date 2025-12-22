import { SvgIcon } from "@mui/material";
import { JSX } from "react";
import { CustomSVGIconProps } from "../../common/entities";

/**
 * Custom remove icon.
 */

export const RemoveIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M4.5375 9.74981C4.3251 9.74981 4.1406 9.67181 3.984 9.51581C3.828 9.35921 3.75 9.17471 3.75 8.96231C3.75 8.7499 3.828 8.5657 3.984 8.4097C4.1406 8.2531 4.3251 8.1748 4.5375 8.1748H13.4619C13.6743 8.1748 13.8588 8.2531 14.0154 8.4097C14.1714 8.5657 14.2494 8.7499 14.2494 8.96231C14.2494 9.17471 14.1714 9.35921 14.0154 9.51581C13.8588 9.67181 13.6743 9.74981 13.4619 9.74981H4.5375Z"
        fill="#currentColor"
      />
    </SvgIcon>
  );
};
