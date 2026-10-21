import { ElementType, JSX } from "react";
import { Filters } from "../../../../common/entities";
import { useExploreState } from "../../../../hooks/useExploreState";
import { useExportToTerraResponseURL } from "../../../../hooks/useExportToTerraResponseURL";
import { useFileManifest } from "../../../../hooks/useFileManifest/useFileManifest";
import { useFileManifestFileCount } from "../../../../hooks/useFileManifest/useFileManifestFileCount";
import { useFileManifestFormat } from "../../../../hooks/useFileManifest/useFileManifestFormat";
import { useRequestFileLocation } from "../../../../hooks/useRequestFileLocation";
import { useRequestManifest } from "../../../../hooks/useRequestManifest/useRequestManifest";
import { FileManifestState } from "../../../../providers/fileManifestState";
import { FormFacet, ManifestDownloadFormat } from "../../common/entities";
import {
  trackDatasetExportToTerraRequested,
  trackExportToTerraRequested,
} from "../../common/tracking";
import { ExportToTerraNotStarted } from "./components/ExportToTerraNotStarted/exportToTerraNotStarted";
import { ExportToTerraReady } from "./components/ExportToTerraReady/exportToTerraReady";

/**
 * Props for the ExportToTerra component.
 */
export interface ExportToTerraProps {
  ExportForm: ElementType;
  ExportToTerraStart: ElementType;
  ExportToTerraSuccess: ElementType;
  fileManifestState: FileManifestState;
  fileSummaryFacetName: string;
  filters: Filters; // Initializes export to terra filters.
  formFacet: FormFacet;
  isDatasetExport?: boolean;
  manifestDownloadFormat?: ManifestDownloadFormat;
  manifestDownloadFormats: ManifestDownloadFormat[];
  speciesFacetName: string;
}

/**
 * Export to Terra. Shows the form until the manifest is returned, then shows
 * a link to Terra built from the configured export to Terra URL; without that
 * URL configured, it throws once the manifest is returned. Requesting the link
 * tracks the export request in analytics.
 * @param props - Component props.
 * @param props.ExportForm - Form component.
 * @param props.ExportToTerraStart - Content rendered above the form.
 * @param props.ExportToTerraSuccess - Content rendered above the link once it is ready.
 * @param props.fileManifestState - File manifest state.
 * @param props.fileSummaryFacetName - Name of the file type facet.
 * @param props.filters - Filters the file manifest is initialized with.
 * @param props.formFacet - Species and file type facets for the form.
 * @param props.isDatasetExport - Whether the export is of a dataset, tracked as a dataset export; defaults to false.
 * @param props.manifestDownloadFormat - Initially selected manifest format.
 * @param props.manifestDownloadFormats - Manifest formats to choose from.
 * @param props.speciesFacetName - Name of the species facet.
 * @returns The export to Terra form, or the link once it is ready.
 */
export const ExportToTerra = ({
  ExportForm,
  ExportToTerraStart,
  ExportToTerraSuccess,
  fileManifestState,
  fileSummaryFacetName,
  filters,
  formFacet,
  isDatasetExport = false,
  manifestDownloadFormat,
  manifestDownloadFormats,
  speciesFacetName,
}: ExportToTerraProps): JSX.Element => {
  const {
    exploreState: { tabValue: entityList },
  } = useExploreState();
  useFileManifest(filters, fileSummaryFacetName);
  useFileManifestFileCount(filters, speciesFacetName, fileSummaryFacetName);
  const fileManifestFormatState = useFileManifestFormat(manifestDownloadFormat);
  const { requestMethod, requestParams, requestUrl } = useRequestManifest(
    fileManifestFormatState.fileManifestFormat,
    formFacet,
  );
  const { data, isLoading, run } = useRequestFileLocation(
    requestUrl,
    requestMethod,
  );
  const exportURL = useExportToTerraResponseURL(requestParams, data);
  return exportURL ? (
    <ExportToTerraReady
      ExportToTerraSuccess={ExportToTerraSuccess}
      exportURL={exportURL}
    />
  ) : (
    <ExportToTerraNotStarted
      ExportTerraForm={ExportForm}
      ExportToTerraStart={ExportToTerraStart}
      fileManifestFormatState={fileManifestFormatState}
      fileManifestState={fileManifestState}
      formFacet={formFacet}
      isLoading={isLoading}
      manifestDownloadFormats={manifestDownloadFormats}
      onRequestManifest={(): void => {
        // Execute GA tracking.
        if (isDatasetExport) {
          trackDatasetExportToTerraRequested();
        } else {
          trackExportToTerraRequested(entityList);
        }
        // Request manifest.
        run();
      }}
    />
  );
};
