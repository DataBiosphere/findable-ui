import { TypographyProps } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { StyledTypography } from "./cardSecondaryTitle.styles";

export const CardSecondaryTitle = (props: TypographyProps): JSX.Element => {
  return (
    <StyledTypography
      color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES}
      {...props}
    />
  );
};
