import React, { ElementType } from "react";
import { ButtonPrimary } from "../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../../Links/common/entities";
import {
  Section,
  SectionActions,
  SectionContent,
} from "../../../../export.styles";

export interface ExportToTerraReadyProps {
  ExportToTerraSuccess: ElementType;
  exportURL: string;
}

export const ExportToTerraReady = ({
  ExportToTerraSuccess,
  exportURL,
}: ExportToTerraReadyProps): JSX.Element => {
  const onOpenTerra = (): void => {
    window.open(
      exportURL,
      ANCHOR_TARGET.BLANK,
      REL_ATTRIBUTE.NO_OPENER_NO_REFERRER
    );
  };
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <ExportToTerraSuccess />
        </SectionContent>
        <SectionActions>
          <ButtonPrimary onClick={onOpenTerra}>Open Terra</ButtonPrimary>
        </SectionActions>
      </Section>
    </FluidPaper>
  );
};
