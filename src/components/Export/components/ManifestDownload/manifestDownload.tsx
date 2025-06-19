import React, { ElementType } from "react";
import { MANIFEST_DOWNLOAD_FORMAT } from "../../../../apis/azul/common/entities";
import { Filters } from "../../../../common/entities";
import { useExploreState } from "../../../../hooks/useExploreState";
import { FileManifestType } from "../../../../hooks/useFileManifest/common/entities";
import { useFileManifest } from "../../../../hooks/useFileManifest/useFileManifest";
import {
  FileLocation,
  useRequestFileLocation,
} from "../../../../hooks/useRequestFileLocation";
import { useRequestManifest } from "../../../../hooks/useRequestManifest/useRequestManifest";
import { FileManifestState } from "../../../../providers/fileManifestState";
import { FormFacet, ManifestDownloadFormat } from "../../common/entities";
import { trackFileManifestRequested } from "../../common/tracking";
import { ManifestDownloadNotStarted } from "./components/ManifestDownloadNotStarted/manifestDownloadNotStarted";
import { ManifestDownloadReady } from "./components/ManifestDownloadReady/manifestDownloadReady";

export interface ManifestDownloadProps {
  fileManifestState: FileManifestState;
  fileManifestType: FileManifestType;
  fileSummaryFacetName: string;
  filters: Filters; // Initializes manifest download filters.
  formFacet: FormFacet;
  ManifestDownloadForm: ElementType;
  manifestDownloadFormat?: ManifestDownloadFormat;
  ManifestDownloadStart: ElementType;
  ManifestDownloadSuccess: ElementType;
  speciesFacetName: string;
}

export const ManifestDownload = ({
  fileManifestState,
  fileSummaryFacetName,
  filters,
  formFacet,
  ManifestDownloadForm,
  manifestDownloadFormat = MANIFEST_DOWNLOAD_FORMAT.COMPACT,
  ManifestDownloadStart,
  ManifestDownloadSuccess,
  speciesFacetName,
}: ManifestDownloadProps): JSX.Element => {
  useFileManifest(filters, fileSummaryFacetName, speciesFacetName);
  const {
    exploreState: { tabValue: entityList },
  } = useExploreState();
  const { requestMethod, requestUrl } = useRequestManifest(
    manifestDownloadFormat,
    formFacet
  );
  const { data, isLoading, run } = useRequestFileLocation(
    requestUrl,
    requestMethod
  );
  const manifestURL = getManifestDownloadURL(data);
  return manifestURL ? (
    <ManifestDownloadReady
      ManifestDownloadSuccess={ManifestDownloadSuccess}
      manifestURL={manifestURL}
    />
  ) : (
    <ManifestDownloadNotStarted
      ManifestDownloadForm={ManifestDownloadForm}
      ManifestDownloadStart={ManifestDownloadStart}
      fileManifestState={fileManifestState}
      formFacet={formFacet}
      isLoading={isLoading}
      onRequestManifest={(): void => {
        trackFileManifestRequested(entityList);
        run();
      }}
    />
  );
};

/**
 * Returns the manifest download URL for the generated manifest.
 * @param fileLocation - Request file location.
 * @returns manifest download URL.
 */
function getManifestDownloadURL(
  fileLocation?: FileLocation
): string | undefined {
  const { location } = fileLocation || {};
  return location;
}
