import { Typography, TypographyProps } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

/**
 * Card title, rendering an h4 in the "body-large-500" typography variant.
 * @param props - Typography props.
 * @returns The card title.
 */
export const CardTitle = (props: TypographyProps): JSX.Element => {
  return (
    <Typography
      component="h4"
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}
      {...props}
    />
  );
};
