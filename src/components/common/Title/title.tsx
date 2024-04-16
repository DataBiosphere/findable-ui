import React, { ReactNode } from "react";
import { TEXT_HEADING_LARGE } from "../../../theme/common/typography";
import { HeroTitle as Typography } from "./title.styles";

export type HeroTitle = ReactNode;

export interface TitleProps {
  className?: string;
  title: HeroTitle;
}

export const Title = ({
  className,
  title,
  ...props /* Spread props to allow for Typography specific props TypographyProps e.g. "gutterBottom" or "noWrap". */
}: TitleProps): JSX.Element => {
  return (
    <>
      {typeof title === "string" ? (
        <Typography
          className={className}
          color="ink.main"
          component="h1"
          variant={TEXT_HEADING_LARGE}
          {...props}
        >
          {title}
        </Typography>
      ) : (
        title
      )}
    </>
  );
};
