import React, { ElementType } from "react";
import { MANIFEST_DOWNLOAD_FORMAT } from "../../../../apis/azul/common/entities";
import { Filters } from "../../../../common/entities";
import { useExploreState } from "../../../../hooks/useExploreState";
import { FileManifestType } from "../../../../hooks/useFileManifest/common/entities";
import { useFileManifest } from "../../../../hooks/useFileManifest/useFileManifest";
import { useRequestFileManifest } from "../../../../hooks/useFileManifest/useRequestFileManifest";
import { FileLocation } from "../../../../hooks/useRequestFileLocation";
import { FileManifestState } from "../../../../providers/fileManifestState";
import { FormFacet } from "../../common/entities";
import { fileManifestTracking } from "../../common/tracking";
import { ManifestDownloadNotStarted } from "./components/ManifestDownloadNotStarted/manifestDownloadNotStarted";
import { ManifestDownloadReady } from "./components/ManifestDownloadReady/manifestDownloadReady";

export interface ManifestDownloadProps {
  fileManifestState: FileManifestState;
  fileManifestType: FileManifestType;
  fileSummaryFacetName: string;
  filters: Filters; // Initializes manifest download filters.
  formFacet: FormFacet;
  ManifestDownloadForm: ElementType;
  ManifestDownloadStart: ElementType;
  ManifestDownloadSuccess: ElementType;
}

export const ManifestDownload = ({
  fileManifestState,
  fileSummaryFacetName,
  filters,
  formFacet,
  ManifestDownloadForm,
  ManifestDownloadStart,
  ManifestDownloadSuccess,
}: ManifestDownloadProps): JSX.Element => {
  useRequestFileManifest(
    MANIFEST_DOWNLOAD_FORMAT.COMPACT,
    filters,
    fileSummaryFacetName
  );
  const {
    exploreState: { tabValue: entityList },
  } = useExploreState();
  const { data, isLoading, run } = useFileManifest();
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
        fileManifestTracking(entityList);
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
