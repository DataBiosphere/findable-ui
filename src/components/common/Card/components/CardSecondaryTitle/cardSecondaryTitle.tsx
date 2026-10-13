import { TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { StyledTypography } from "./cardSecondaryTitle.styles";

/**
 * Card secondary title, rendering light ink text in the "body-small-400-2lines" typography variant.
 * @param props - Typography props.
 * @returns The card secondary title.
 */
export const CardSecondaryTitle = (props: TypographyProps): JSX.Element => {
  return (
    <StyledTypography
      color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES}
      {...props}
    />
  );
};
