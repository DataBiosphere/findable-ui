import { stepIconClasses } from "@mui/material";
import React from "react";
import { TestIdProps } from "../../../../../../../types";
import { StyledSvgIcon } from "./completedIcon.styles";
import { SVG_ICON_PROPS } from "./contants";

export const CompletedIcon = ({ testId }: TestIdProps): JSX.Element => {
  return (
    <StyledSvgIcon
      {...SVG_ICON_PROPS}
      className={stepIconClasses.completed}
      data-testid={testId}
    >
      <path
        d="M7.18129 13.1814C7.08109 13.1814 6.98419 13.1625 6.89059 13.1247C6.79699 13.0875 6.7064 13.0251 6.61879 12.9375L3.44989 9.7686C3.2999 9.61857 3.22819 9.42813 3.23479 9.1971C3.24079 8.96551 3.3188 8.77471 3.46879 8.6247C3.61879 8.47471 3.80629 8.3997 4.03129 8.3997C4.25629 8.3997 4.4438 8.47471 4.59379 8.6247L7.21909 11.25L13.4255 5.0436C13.5755 4.89361 13.7597 4.8186 13.9781 4.8186C14.1971 4.8186 14.3816 4.89361 14.5316 5.0436C14.6816 5.19361 14.7566 5.37811 14.7566 5.5971C14.7566 5.81551 14.6816 5.99971 14.5316 6.1497L7.74379 12.9375C7.65619 13.0251 7.56559 13.0875 7.47199 13.1247C7.37839 13.1625 7.2815 13.1814 7.18129 13.1814Z"
        fill="currentColor"
      />
    </StyledSvgIcon>
  );
};
