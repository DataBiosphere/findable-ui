import { Typography, TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

/**
 * Card text, rendering text in the "body-400-2lines" typography variant.
 * @param props - Typography props.
 * @returns The card text.
 */
export const CardText = (props: TypographyProps): JSX.Element => {
  return (
    <Typography
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES}
      {...props}
    />
  );
};
