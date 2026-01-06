import { JSX, ElementType } from "react";
import { Filters } from "../../../../common/entities";
import { useExploreState } from "../../../../hooks/useExploreState";
import { useExportToTerraResponseURL } from "../../../../hooks/useExportToTerraResponseURL";
import { FileManifestType } from "../../../../hooks/useFileManifest/common/entities";
import { useFileManifest } from "../../../../hooks/useFileManifest/useFileManifest";
import { useFileManifestFileCount } from "../../../../hooks/useFileManifest/useFileManifestFileCount";
import { useFileManifestFormat } from "../../../../hooks/useFileManifest/useFileManifestFormat";
import { useRequestFileLocation } from "../../../../hooks/useRequestFileLocation";
import { useRequestManifest } from "../../../../hooks/useRequestManifest/useRequestManifest";
import { FileManifestState } from "../../../../providers/fileManifestState";
import { FormFacet, ManifestDownloadFormat } from "../../common/entities";
import { trackExportToTerraRequested } from "../../common/tracking";
import { ExportToTerraNotStarted } from "./components/ExportToTerraNotStarted/exportToTerraNotStarted";
import { ExportToTerraReady } from "./components/ExportToTerraReady/exportToTerraReady";

export interface ExportToTerraProps {
  ExportForm: ElementType;
  ExportToTerraStart: ElementType;
  ExportToTerraSuccess: ElementType;
  fileManifestState: FileManifestState;
  fileManifestType: FileManifestType;
  fileSummaryFacetName: string;
  filters: Filters; // Initializes export to terra filters.
  formFacet: FormFacet;
  manifestDownloadFormat?: ManifestDownloadFormat;
  manifestDownloadFormats: ManifestDownloadFormat[];
  speciesFacetName: string;
}

export const ExportToTerra = ({
  ExportForm,
  ExportToTerraStart,
  ExportToTerraSuccess,
  fileManifestState,
  fileSummaryFacetName,
  filters,
  formFacet,
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
        // Execute GA tracking
        trackExportToTerraRequested(entityList);
        // Request manifest
        run();
      }}
    />
  );
};
