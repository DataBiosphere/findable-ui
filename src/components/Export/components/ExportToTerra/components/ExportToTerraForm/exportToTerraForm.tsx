import React from "react";
import { FormFacet, ManifestDownloadFormat } from "../../../../common/entities";
import { ExportButton } from "../../../ExportForm/components/ExportButton/exportButton";
import { ExportManifestDownloadFormatForm } from "../../../ExportForm/components/ExportManifestDownloadFormatForm/exportManifestDownloadFormatForm";
import {
  ExportForm,
  OnRequestManifestFn,
} from "../../../ExportForm/exportForm";

export interface ExportToTerraFormProps {
  formFacet: FormFacet;
  isLoading: boolean;
  manifestDownloadFormat?: ManifestDownloadFormat;
  manifestDownloadFormats: ManifestDownloadFormat[];
  onRequestManifest: OnRequestManifestFn;
}

export const ExportToTerraForm = ({
  formFacet,
  isLoading,
  manifestDownloadFormat,
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
        manifestDownloadFormat={manifestDownloadFormat}
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
