import { Typography, TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

export const CardSecondaryText = (props: TypographyProps): JSX.Element => {
  return (
    <Typography
      color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES}
      {...props}
    />
  );
};
