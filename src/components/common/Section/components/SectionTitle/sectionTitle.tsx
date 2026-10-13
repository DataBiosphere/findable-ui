import { Typography } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";

/**
 * Props for the SectionTitle component.
 */
export interface SectionTitleProps {
  className?: string;
  title: string;
}

/**
 * Section title, rendered as an h3.
 * @param props - Component props.
 * @param props.className - Class name applied to the title.
 * @param props.title - Title text.
 * @returns The section title.
 */
export const SectionTitle = ({
  className,
  title,
}: SectionTitleProps): JSX.Element => {
  return (
    <Typography
      align="left"
      className={className}
      color={TYPOGRAPHY_PROPS.COLOR.INK_MAIN}
      component="h3"
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}
    >
      {title}
    </Typography>
  );
};
