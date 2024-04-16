import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TEXT_BODY_SMALL_400 } from "../../../../../../../../theme/common/typography";

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
        <Typography color="ink.light" variant={TEXT_BODY_SMALL_400} {...props}>
          {subTitle}
        </Typography>
      ) : (
        subTitle
      )}
    </>
  );
};
