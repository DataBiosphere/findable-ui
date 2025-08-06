import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../styles/common/mui/typography";

export interface SubTitleProps {
  subTitle?: ReactNode;
}

export const SubTitle = ({
  subTitle,
  ...props /* Spread props to allow for Typography specific props TypographyProps e.g. "gutterBottom" or "noWrap". */
}: SubTitleProps): JSX.Element => {
  return (
    <>
      {typeof subTitle === "string" ? (
        <Typography
          color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
          {...props}
        >
          {subTitle}
        </Typography>
      ) : (
        subTitle
      )}
    </>
  );
};
