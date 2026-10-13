import { Typography, TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

/**
 * Card secondary text, rendering light ink text in the "body-small-400-2lines" typography variant.
 * @param props - Typography props.
 * @returns The card secondary text.
 */
export const CardSecondaryText = (props: TypographyProps): JSX.Element => {
  return (
    <Typography
      color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES}
      {...props}
    />
  );
};
