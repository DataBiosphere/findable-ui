import { ElementType, JSX } from "react";
import { FileManifestState } from "../../../../../../providers/fileManifestState";
import { PAPER_PANEL_STYLE } from "../../../../../common/Paper/paper";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { Loading } from "../../../../../Loading/loading";
import { FormFacet } from "../../../../common/entities";
import { Section, SectionContent } from "../../../../export.styles";

/**
 * Props for the ManifestDownloadNotStarted component.
 */
export interface ManifestDownloadNotStartedProps {
  fileManifestState: FileManifestState;
  formFacet: FormFacet;
  isLoading: boolean;
  ManifestDownloadForm: ElementType;
  ManifestDownloadStart: ElementType;
  onRequestManifest: () => void;
}

/**
 * Manifest download before the manifest is ready: the start content and the
 * form, under a loading overlay while the manifest is being prepared.
 * @param props - Component props.
 * @param props.fileManifestState - File manifest state; its loading flag is passed to the form.
 * @param props.formFacet - Species and file type facets for the form.
 * @param props.isLoading - Whether the manifest is being prepared; shows the loading overlay.
 * @param props.ManifestDownloadForm - Form component, rendered with the facet and request props.
 * @param props.ManifestDownloadStart - Content rendered above the form.
 * @param props.onRequestManifest - Invoked when the form requests the manifest.
 * @returns The manifest download form view.
 */
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
