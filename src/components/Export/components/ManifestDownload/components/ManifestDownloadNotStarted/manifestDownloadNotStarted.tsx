import React, { ElementType } from "react";
import { FileManifestState } from "../../../../../../providers/fileManifestState";
import { PAPER_PANEL_STYLE } from "../../../../../common/Paper/paper";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { Loading } from "../../../../../Loading/loading";
import { FormFacet } from "../../../../common/entities";
import { Section, SectionContent } from "../../../../export.styles";

export interface ManifestDownloadNotStartedProps {
  fileManifestState: FileManifestState;
  formFacet: FormFacet;
  isLoading: boolean;
  ManifestDownloadForm: ElementType;
  ManifestDownloadStart: ElementType;
  onRequestManifest: () => void;
}

export const ManifestDownloadNotStarted = ({
  fileManifestState,
  formFacet,
  isLoading,
  ManifestDownloadForm,
  ManifestDownloadStart,
  onRequestManifest,
}: ManifestDownloadNotStartedProps): JSX.Element => {
  return (
    <div>
      <Loading
        loading={isLoading}
        panelStyle={PAPER_PANEL_STYLE.FLUID}
        text="Your manifest will be ready shortly..."
      />
      <FluidPaper>
        <Section>
          <SectionContent>
            <ManifestDownloadStart />
          </SectionContent>
          <ManifestDownloadForm
            formFacet={formFacet}
            isLoading={fileManifestState.isLoading}
            onRequestManifest={onRequestManifest}
          />
        </Section>
      </FluidPaper>
    </div>
  );
};
