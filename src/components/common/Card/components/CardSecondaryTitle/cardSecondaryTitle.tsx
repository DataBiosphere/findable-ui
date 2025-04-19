import React, { ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { CardSecondaryTitle as SecondaryTitle } from "./cardSecondaryTitle.styles";

export interface CardSecondaryTitleProps {
  children: ReactNode;
}

export const CardSecondaryTitle = ({
  children,
  ...props /* Spread props to allow for Mui TypographyProps specific prop overrides e.g. "variant". */
}: CardSecondaryTitleProps): JSX.Element => {
  return (
    <SecondaryTitle
      color="ink.light"
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES}
      {...props}
    >
      {children}
    </SecondaryTitle>
  );
};
