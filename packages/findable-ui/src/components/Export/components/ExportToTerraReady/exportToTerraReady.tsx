import Link from "next/link";
import React from "react";
import { ButtonPrimary } from "../../../common/Button/button.styles";
import { FluidPaper } from "../../../common/Paper/paper.styles";
import { SectionTitle } from "../../../common/Section/components/SectionTitle/sectionTitle";
import {
  Section,
  SectionActions,
  SectionContent,
  SectionText,
} from "../../../common/Section/section.styles";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { BatchNormalizationWarning } from "../BatchNormalizationWarning/batchNormalizationWarning";

export interface ExportToTerraReadyProps {
  terraUrl: string;
}

export const ExportToTerraReady = ({
  terraUrl,
}: ExportToTerraReadyProps): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <SectionTitle title="Your Terra Workspace Link is Ready" />
          <SectionText component="div" variant="text-body-400-2lines">
            <p>
              Your Terra Workspace has been opened in a new browser tab. The
              workspace URL is referenced below.
            </p>
            <BatchNormalizationWarning />
          </SectionText>
        </SectionContent>
        <SectionActions>
          <Link href={terraUrl} passHref>
            <ButtonPrimary
              href="passHref"
              rel="noopener"
              target={ANCHOR_TARGET.BLANK}
            >
              Open Terra
            </ButtonPrimary>
          </Link>
        </SectionActions>
      </Section>
    </FluidPaper>
  );
};
