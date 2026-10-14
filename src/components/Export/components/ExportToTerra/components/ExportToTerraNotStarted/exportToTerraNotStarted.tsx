import { ElementType, JSX } from "react";
import { FileManifestFormatState } from "../../../../../../hooks/useFileManifest/useFileManifestFormat";
import { FileManifestState } from "../../../../../../providers/fileManifestState";
import { PAPER_PANEL_STYLE } from "../../../../../common/Paper/paper";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { Loading } from "../../../../../Loading/loading";
import { FormFacet, ManifestDownloadFormat } from "../../../../common/entities";
import { Section, SectionContent } from "../../../../export.styles";
import { OnRequestManifestFn } from "../../../ExportForm/exportForm";

/**
 * Props for the ExportToTerraNotStarted component.
 */
export interface ExportToTerraNotStartedProps {
  ExportTerraForm: ElementType;
  ExportToTerraStart: ElementType;
  fileManifestFormatState: FileManifestFormatState;
  fileManifestState: FileManifestState;
  formFacet: FormFacet;
  isLoading: boolean;
  manifestDownloadFormats: ManifestDownloadFormat[];
  onRequestManifest: OnRequestManifestFn;
}

/**
 * Export to Terra before the link is ready: the start content and the form,
 * under a loading overlay while the link is being prepared.
 * @param props - Component props.
 * @param props.ExportTerraForm - Form component, rendered with the format, facet and request props.
 * @param props.ExportToTerraStart - Content rendered above the form.
 * @param props.fileManifestFormatState - Selected manifest format and its setter.
 * @param props.fileManifestState - File manifest state; its loading flag is passed to the form.
 * @param props.formFacet - Species and file type facets for the form.
 * @param props.isLoading - Whether the link is being prepared; shows the loading overlay.
 * @param props.manifestDownloadFormats - Manifest formats to choose from.
 * @param props.onRequestManifest - Invoked when the form requests the link.
 * @returns The export to Terra form view.
 */
export const ExportToTerraNotStarted = ({
  ExportTerraForm,
  ExportToTerraStart,
  fileManifestFormatState,
  fileManifestState,
  formFacet,
  isLoading,
  manifestDownloadFormats,
  onRequestManifest,
}: ExportToTerraNotStartedProps): JSX.Element => {
  return (
    <div>
      <Loading
        loading={isLoading}
        panelStyle={PAPER_PANEL_STYLE.FLUID}
        text="Your link will be ready shortly..."
      />
      <FluidPaper>
        <Section>
          <SectionContent>
            <ExportToTerraStart />
          </SectionContent>
          <ExportTerraForm
            fileManifestFormatState={fileManifestFormatState}
            formFacet={formFacet}
            isLoading={fileManifestState.isLoading}
            manifestDownloadFormats={manifestDownloadFormats}
            onRequestManifest={onRequestManifest}
          />
        </Section>
      </FluidPaper>
    </div>
  );
};
