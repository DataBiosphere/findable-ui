import { SvgIcon } from "@mui/material";
import { JSX } from "react";
import { CustomSVGIconProps } from "../../common/entities";

/**
 * Custom add icon.
 */

export const AddIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M8.9997 14.2494C8.7873 14.2494 8.6028 14.1714 8.4462 14.0154C8.2902 13.8588 8.2122 13.6743 8.2122 13.4619V9.7872H4.5375C4.3251 9.7872 4.1406 9.7092 3.984 9.5532C3.828 9.3966 3.75 9.2121 3.75 8.9997C3.75 8.7873 3.828 8.6028 3.984 8.4462C4.1406 8.2902 4.3251 8.2122 4.5375 8.2122H8.2122V4.5375C8.2122 4.3251 8.2902 4.1406 8.4462 3.984C8.6028 3.828 8.7873 3.75 8.9997 3.75C9.2121 3.75 9.3966 3.828 9.5532 3.984C9.7092 4.1406 9.7872 4.3251 9.7872 4.5375V8.2122H13.4619C13.6743 8.2122 13.8588 8.2902 14.0154 8.4462C14.1714 8.6028 14.2494 8.7873 14.2494 8.9997C14.2494 9.2121 14.1714 9.3966 14.0154 9.5532C13.8588 9.7092 13.6743 9.7872 13.4619 9.7872H9.7872V13.4619C9.7872 13.6743 9.7092 13.8588 9.5532 14.0154C9.3966 14.1714 9.2121 14.2494 8.9997 14.2494Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
