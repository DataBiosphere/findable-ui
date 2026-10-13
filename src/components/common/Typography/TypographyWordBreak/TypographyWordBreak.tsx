import { Typography } from "@mui/material";
import { JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";

/**
 * Props for the TypographyWordBreak component.
 */
export interface TypographyWordBreakProps {
  children: ReactNode;
}

/**
 * Inline text that breaks long words to avoid overflow, inheriting the surrounding typography.
 * @param props - Component props.
 * @param props.children - Text content.
 * @returns The word-breaking text.
 */
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
