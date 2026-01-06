import { SvgIcon } from "@mui/material";
import { JSX } from "react";
import { CustomSVGIconProps } from "../../common/entities";

/**
 * Custom south (back arrow) icon.
 */

export const SouthIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M1.8192 9.00009C1.8192 8.89989 1.8411 8.79999 1.8849 8.70039C1.9287 8.60019 1.9881 8.51259 2.0631 8.43759L6.1878 4.31289C6.3378 4.16289 6.5223 4.08789 6.7413 4.08789C6.9597 4.08789 7.1439 4.16289 7.2939 4.31289C7.4439 4.46289 7.5189 4.64409 7.5189 4.85649C7.5189 5.06889 7.4439 5.25009 7.2939 5.40009L4.5003 8.21259L15.7125 8.21259C15.9249 8.21259 16.1094 8.29059 16.266 8.44659C16.422 8.60319 16.5 8.78769 16.5 9.00009C16.5 9.21249 16.422 9.39699 16.266 9.55359C16.1094 9.70959 15.9249 9.78759 15.7125 9.78759L4.5003 9.78759L7.2939 12.6001C7.4439 12.7501 7.5189 12.9313 7.5189 13.1437C7.5189 13.3561 7.4439 13.5373 7.2939 13.6873C7.1439 13.8373 6.9597 13.9123 6.7413 13.9123C6.5223 13.9123 6.3378 13.8373 6.1878 13.6873L2.0631 9.56259C1.9881 9.48759 1.9287 9.39999 1.8849 9.29979C1.8411 9.20019 1.8192 9.10029 1.8192 9.00009Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
