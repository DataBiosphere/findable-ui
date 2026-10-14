import { ElementType, JSX } from "react";
import { MANIFEST_DOWNLOAD_FORMAT } from "../../../../apis/azul/common/entities";
import { Filters } from "../../../../common/entities";
import { useExploreState } from "../../../../hooks/useExploreState";
import { useFileManifest } from "../../../../hooks/useFileManifest/useFileManifest";
import { useFileManifestFileCount } from "../../../../hooks/useFileManifest/useFileManifestFileCount";
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

/**
 * Props for the ManifestDownload component.
 */
export interface ManifestDownloadProps {
  fileManifestState: FileManifestState;
  fileSummaryFacetName: string;
  filters: Filters; // Initializes manifest download filters.
  formFacet: FormFacet;
  ManifestDownloadForm: ElementType;
  manifestDownloadFormat?: ManifestDownloadFormat;
  ManifestDownloadStart: ElementType;
  ManifestDownloadSuccess: ElementType;
  speciesFacetName: string;
}

/**
 * Manifest download. Shows the form until a manifest URL is returned, then
 * shows the URL. Requesting the manifest tracks the request in analytics.
 * @param props - Component props.
 * @param props.fileManifestState - File manifest state.
 * @param props.fileSummaryFacetName - Name of the file type facet.
 * @param props.filters - Filters the file manifest is initialized with.
 * @param props.formFacet - Species and file type facets for the form.
 * @param props.ManifestDownloadForm - Form component.
 * @param props.manifestDownloadFormat - Manifest format to request; defaults to MANIFEST_DOWNLOAD_FORMAT.COMPACT.
 * @param props.ManifestDownloadStart - Content rendered above the form.
 * @param props.ManifestDownloadSuccess - Content rendered above the URL once it is ready.
 * @param props.speciesFacetName - Name of the species facet.
 * @returns The manifest download form, or the URL once it is ready.
 */
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
  useFileManifest(filters, fileSummaryFacetName);
  useFileManifestFileCount(filters, speciesFacetName, fileSummaryFacetName);
  const {
    exploreState: { tabValue: entityList },
  } = useExploreState();
  const { requestMethod, requestUrl } = useRequestManifest(
    manifestDownloadFormat,
    formFacet,
  );
  const { data, isLoading, run } = useRequestFileLocation(
    requestUrl,
    requestMethod,
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
  fileLocation?: FileLocation,
): string | undefined {
  const { location } = fileLocation || {};
  return location;
}
