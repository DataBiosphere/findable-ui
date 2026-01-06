import { Typography } from "@mui/material";
import { JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";

export interface TypographyWordBreakProps {
  children: ReactNode;
}

export const TypographyWordBreak = ({
  children,
  ...props /* Spread props to allow for Typography specific props e.g. "color". */
}: TypographyWordBreakProps): JSX.Element => {
  return (
    <Typography
      component="span"
      sx={{ wordBreak: "break-word" }}
      variant={TYPOGRAPHY_PROPS.VARIANT.INHERIT}
      {...props}
    >
      {children}
    </Typography>
  );
};
