import React, { ReactNode } from "react";
import { TEXT_BODY_SMALL_400_2_LINES } from "../../../../../theme/common/typography";
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
      variant={TEXT_BODY_SMALL_400_2_LINES}
      {...props}
    >
      {children}
    </SecondaryTitle>
  );
};
