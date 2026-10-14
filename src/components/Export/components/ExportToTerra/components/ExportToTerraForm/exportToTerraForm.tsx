import { Dispatch, JSX, SetStateAction } from "react";
import { FileManifestFormatState } from "../../../../../../hooks/useFileManifest/useFileManifestFormat";
import { FormFacet, ManifestDownloadFormat } from "../../../../common/entities";
import { ExportButton } from "../../../ExportForm/components/ExportButton/exportButton";
import { ExportManifestDownloadFormatForm } from "../../../ExportForm/components/ExportManifestDownloadFormatForm/exportManifestDownloadFormatForm";
import {
  ExportForm,
  OnRequestManifestFn,
} from "../../../ExportForm/exportForm";

/**
 * Props for the ExportToTerraForm component.
 */
export interface ExportToTerraFormProps {
  fileManifestFormatState: FileManifestFormatState;
  formFacet: FormFacet;
  isLoading: boolean;
  manifestDownloadFormats: ManifestDownloadFormat[];
  onRequestManifest: OnRequestManifestFn;
  setFileManifestFormat: Dispatch<
    SetStateAction<ManifestDownloadFormat | undefined>
  >;
}

/**
 * Export form for the export to Terra: the species and file type forms, a
 * manifest download format choice and a "Request Link" button. The
 * setFileManifestFormat prop is unused; the format is set through
 * fileManifestFormatState.
 * @param props - Component props.
 * @param props.fileManifestFormatState - Selected manifest format and its setter.
 * @param props.formFacet - Species and file type facets for the form.
 * @param props.isLoading - Whether the form's facets are loading.
 * @param props.manifestDownloadFormats - Manifest formats to choose from.
 * @param props.onRequestManifest - Invoked when the form is submitted with a species and file type selected.
 * @returns The export to Terra form.
 */
export const ExportToTerraForm = ({
  fileManifestFormatState,
  formFacet,
  isLoading,
  manifestDownloadFormats,
  onRequestManifest,
}: ExportToTerraFormProps): JSX.Element => {
  return (
    <ExportForm
      Button={renderButton}
      formFacet={formFacet}
      isLoading={isLoading}
      onRequestManifest={onRequestManifest}
    >
      <ExportManifestDownloadFormatForm
        fileManifestFormatState={fileManifestFormatState}
        manifestDownloadFormats={manifestDownloadFormats}
      />
    </ExportForm>
  );
};

/**
 * Build the export button.
 * @param props - Button props e.g. "onClick" to request manifest.
 * @returns button element.
 */
function renderButton({ ...props }): JSX.Element {
  return <ExportButton {...props}>Request Link</ExportButton>;
}
