import React, { ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../styles/common/mui/typography";
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
          variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE}
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
