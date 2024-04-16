import React from "react";
import { FormFacet } from "../../../../common/entities";
import { ExportButton } from "../../../ExportForm/components/ExportButton/exportButton";
import {
  ExportForm,
  OnRequestManifestFn,
} from "../../../ExportForm/exportForm";

export interface ManifestDownloadFormProps {
  formFacet: FormFacet;
  isLoading: boolean;
  onRequestManifest: OnRequestManifestFn;
}

export const ManifestDownloadForm = ({
  formFacet,
  isLoading,
  onRequestManifest,
}: ManifestDownloadFormProps): JSX.Element => {
  return (
    <ExportForm
      Button={renderButton}
      formFacet={formFacet}
      isLoading={isLoading}
      onRequestManifest={onRequestManifest}
    />
  );
};

/**
 * Build the export button.
 * @param props - Button props e.g. "onClick" to request manifest.
 * @returns button element.
 */
function renderButton({ ...props }): JSX.Element {
  return <ExportButton {...props}>Prepare Manifest</ExportButton>;
}
