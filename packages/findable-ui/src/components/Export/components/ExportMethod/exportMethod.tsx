import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { FluidPaper } from "../../../common/Paper/paper.styles";
import { SectionTitle } from "../../../common/Section/components/SectionTitle/sectionTitle";
import {
  Section,
  SectionActions,
  SectionContent,
} from "../../../common/Section/section.styles";
import { ExportButton } from "./exportMethod.styles";

export interface ExportMethodProps {
  buttonLabel: string;
  description: string;
  disabled: boolean;
  route: string;
  title: string;
}

export const ExportMethod = ({
  buttonLabel,
  description,
  disabled,
  route,
  title,
}: ExportMethodProps): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <SectionTitle title={title} />
          <Typography variant="text-body-400-2lines">{description}</Typography>
        </SectionContent>
        <SectionActions>
          <Link href={route} passHref>
            <ExportButton disabled={disabled}>{buttonLabel}</ExportButton>
          </Link>
        </SectionActions>
      </Section>
    </FluidPaper>
  );
};
