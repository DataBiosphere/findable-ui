import React from "react";
import { ButtonPrimary } from "../../../common/Button/button.styles";
import { FluidPaper } from "../../../common/Paper/paper.styles";
import { SectionTitle } from "../../../common/Section/components/SectionTitle/sectionTitle";
import {
  Section,
  SectionActions,
  SectionContent,
} from "../../../common/Section/section.styles";
import { BatchNormalizationWarning } from "../BatchNormalizationWarning/batchNormalizationWarning";

export type RunFn = () => void;

export interface ExportToTerraNotStartedProps {
  run: RunFn;
}

export const ExportToTerraNotStarted = ({
  run,
}: ExportToTerraNotStartedProps): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <SectionTitle title="Export To Terra" />
          <BatchNormalizationWarning />
        </SectionContent>
        <SectionActions>
          <ButtonPrimary onClick={run}>Request link</ButtonPrimary>
        </SectionActions>
      </Section>
    </FluidPaper>
  );
};
