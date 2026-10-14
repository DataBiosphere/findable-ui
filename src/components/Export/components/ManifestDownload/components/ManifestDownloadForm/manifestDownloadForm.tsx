import { JSX } from "react";
import { FormFacet } from "../../../../common/entities";
import { ExportButton } from "../../../ExportForm/components/ExportButton/exportButton";
import {
  ExportForm,
  OnRequestManifestFn,
} from "../../../ExportForm/exportForm";

/**
 * Props for the ManifestDownloadForm component.
 */
export interface ManifestDownloadFormProps {
  formFacet: FormFacet;
  isLoading: boolean;
  onRequestManifest: OnRequestManifestFn;
}

/**
 * Export form for the manifest download: the species and file type forms and
 * a "Prepare Manifest" button.
 * @param props - Component props.
 * @param props.formFacet - Species and file type facets for the form.
 * @param props.isLoading - Whether the form's facets are loading.
 * @param props.onRequestManifest - Invoked when the form is submitted with a species and file type selected.
 * @returns The manifest download form.
 */
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
