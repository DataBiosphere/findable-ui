import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../styles/common/mui/typography";
import { Section as PreviewSection } from "./section.styles";

export interface SectionProps {
  children?: ReactNode | ReactNode[];
  className?: string;
  title?: ReactNode;
}

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
