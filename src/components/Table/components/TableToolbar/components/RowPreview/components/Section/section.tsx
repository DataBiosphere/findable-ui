import { Typography } from "@mui/material";
import { JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../styles/common/mui/typography";
import { Section as PreviewSection } from "./section.styles";

/**
 * Props for the row preview Section component.
 */
export interface SectionProps {
  children?: ReactNode | ReactNode[];
  className?: string;
  title?: ReactNode;
}

/**
 * Row preview section, with a heading followed by the children.
 * @param props - Component props.
 * @param props.children - Section content.
 * @param props.className - Class name applied to the section.
 * @param props.title - Section heading.
 * @returns The section.
 */
export const Section = ({
  children,
  className,
  title,
}: SectionProps): JSX.Element => {
  return (
    <PreviewSection className={className}>
      <Typography
        component="div"
        variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL}
      >
        {title}
      </Typography>
      {children}
    </PreviewSection>
  );
};
