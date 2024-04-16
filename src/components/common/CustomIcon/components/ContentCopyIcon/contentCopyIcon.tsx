import { SvgIcon } from "@mui/material";
import React from "react";
import { CustomSVGIconProps } from "../../common/entities";

/**
 * Custom content copy icon.
 */

export const ContentCopyIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomSVGIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M6.975 13.3494C6.5376 13.3494 6.1656 13.1964 5.859 12.8904C5.553 12.5838 5.4 12.2118 5.4 11.7744V3.075C5.4 2.6376 5.553 2.2656 5.859 1.959C6.1656 1.653 6.5376 1.5 6.975 1.5H13.4253C13.8627 1.5 14.2344 1.653 14.5404 1.959C14.847 2.2656 15.0003 2.6376 15.0003 3.075V11.7744C15.0003 12.2118 14.847 12.5838 14.5404 12.8904C14.2344 13.1964 13.8627 13.3494 13.4253 13.3494H6.975ZM6.975 11.7744H13.4253V3.075H6.975V11.7744ZM3.825 16.4994C3.3876 16.4994 3.0156 16.3464 2.709 16.0404C2.403 15.7338 2.25 15.3618 2.25 14.9244V5.3439C2.25 5.1309 2.328 4.9464 2.484 4.7904C2.6406 4.6338 2.8251 4.5555 3.0375 4.5555C3.2499 4.5555 3.4344 4.6338 3.591 4.7904C3.747 4.9464 3.825 5.1309 3.825 5.3439V14.9244H11.1564C11.3688 14.9244 11.553 15.0027 11.709 15.1593C11.8656 15.3153 11.9439 15.4995 11.9439 15.7119C11.9439 15.9243 11.8656 16.1088 11.709 16.2654C11.553 16.4214 11.3688 16.4994 11.1564 16.4994H3.825Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
