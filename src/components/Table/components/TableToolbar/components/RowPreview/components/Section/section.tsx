import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TEXT_HEADING_SMALL } from "../../../../../../../../theme/common/typography";
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
      <Typography component="div" variant={TEXT_HEADING_SMALL}>
        {title}
      </Typography>
      {children}
    </PreviewSection>
  );
};
