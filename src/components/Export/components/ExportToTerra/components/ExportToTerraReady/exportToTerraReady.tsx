import { Button, Link } from "@mui/material";
import { ElementType, JSX } from "react";
import { BUTTON_PROPS } from "../../../../../../styles/common/mui/button";
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

/**
 * Props for the ExportToTerraReady component.
 */
export interface ExportToTerraReadyProps {
  ExportToTerraSuccess: ElementType;
  exportURL: string;
}

/**
 * Export to Terra once the link is ready: the success content and an
 * "Open Terra" button that opens the link in a new tab.
 * @param props - Component props.
 * @param props.ExportToTerraSuccess - Content rendered above the button.
 * @param props.exportURL - Terra URL to open.
 * @returns The ready export to Terra view.
 */
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
