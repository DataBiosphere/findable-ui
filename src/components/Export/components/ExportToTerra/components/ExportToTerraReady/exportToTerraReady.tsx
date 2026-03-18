import { JSX, ElementType } from "react";
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
import { BUTTON_PROPS } from "../../../../../../styles/common/mui/button";
import { Button, Link } from "@mui/material";

export interface ExportToTerraReadyProps {
  ExportToTerraSuccess: ElementType;
  exportURL: string;
}

export const ExportToTerraReady = ({
  ExportToTerraSuccess,
  exportURL,
}: ExportToTerraReadyProps): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <ExportToTerraSuccess />
        </SectionContent>
        <SectionActions>
          <Button
            color={BUTTON_PROPS.COLOR.PRIMARY}
            component={Link}
            href={exportURL}
            rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
            target={ANCHOR_TARGET.BLANK}
            variant={BUTTON_PROPS.VARIANT.CONTAINED}
          >
            Open Terra
          </Button>
        </SectionActions>
      </Section>
    </FluidPaper>
  );
};
