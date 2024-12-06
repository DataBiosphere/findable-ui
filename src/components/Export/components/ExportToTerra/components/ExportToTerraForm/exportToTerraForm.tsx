import React, { Dispatch, SetStateAction } from "react";
import { FileManifestFormatState } from "../../../../../../hooks/useFileManifest/useFileManifestFormat";
import { FormFacet, ManifestDownloadFormat } from "../../../../common/entities";
import { ExportButton } from "../../../ExportForm/components/ExportButton/exportButton";
import { ExportManifestDownloadFormatForm } from "../../../ExportForm/components/ExportManifestDownloadFormatForm/exportManifestDownloadFormatForm";
import {
  ExportForm,
  OnRequestManifestFn,
} from "../../../ExportForm/exportForm";

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
