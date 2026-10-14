import { ElementType, JSX, useState } from "react";
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
import {
  BULK_DOWNLOAD_EXECUTION_ENVIRONMENT,
  ExecutionEnvironment,
  FormFacet,
  ManifestDownloadFormat,
} from "../../common/entities";
import { trackBulkDownloadRequested } from "../../common/tracking";
import { DownloadCurlCommandNotStarted } from "./components/DownloadCurlCommandNotStarted/downloadCurlCommandNotStarted";
import { DownloadCurlCommandReady } from "./components/DownloadCurlCommandReady/downloadCurlCommandReady";

interface DownloadCurlCommandProps {
  DownloadCurlForm: ElementType;
  DownloadCurlStart: ElementType;
  DownloadCurlSuccess: ElementType;
  fileManifestState: FileManifestState;
  fileSummaryFacetName: string;
  filters: Filters; // Initializes bulk download filters.
  formFacet: FormFacet;
  manifestDownloadFormat?: ManifestDownloadFormat;
  speciesFacetName: string;
}

/**
 * Curl command download. Shows the form until a curl command for the selected
 * shell is returned, then shows the command. Requesting the command tracks the
 * bulk download request in analytics.
 * @param props - Component props.
 * @param props.DownloadCurlForm - Form component.
 * @param props.DownloadCurlStart - Content rendered above the form.
 * @param props.DownloadCurlSuccess - Content rendered above the command once it is ready.
 * @param props.fileManifestState - File manifest state.
 * @param props.fileSummaryFacetName - Name of the file type facet.
 * @param props.filters - Filters the file manifest is initialized with.
 * @param props.formFacet - Species and file type facets for the form.
 * @param props.manifestDownloadFormat - Manifest format to request; defaults to MANIFEST_DOWNLOAD_FORMAT.CURL.
 * @param props.speciesFacetName - Name of the species facet.
 * @returns The curl command form, or the command once it is ready.
 */
export const DownloadCurlCommand = ({
  DownloadCurlForm,
  DownloadCurlStart,
  DownloadCurlSuccess,
  fileManifestState,
  fileSummaryFacetName,
  filters,
  formFacet,
  manifestDownloadFormat = MANIFEST_DOWNLOAD_FORMAT.CURL,
  speciesFacetName,
}: DownloadCurlCommandProps): JSX.Element => {
  useFileManifest(filters, fileSummaryFacetName);
  useFileManifestFileCount(filters, speciesFacetName, fileSummaryFacetName);
  const [executionEnvironment, setExecutionEnvironment] =
    useState<ExecutionEnvironment>(BULK_DOWNLOAD_EXECUTION_ENVIRONMENT.BASH);
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
  const curlCommand = getBulkDownloadCurlCommand(data, executionEnvironment);
  return curlCommand ? (
    <DownloadCurlCommandReady
      curlCommand={curlCommand}
      DownloadCurlSuccess={DownloadCurlSuccess}
    />
  ) : (
    <DownloadCurlCommandNotStarted
      DownloadCurlForm={DownloadCurlForm}
      DownloadCurlStart={DownloadCurlStart}
      executionEnvironment={executionEnvironment}
      fileManifestState={fileManifestState}
      formFacet={formFacet}
      isLoading={isLoading}
      onRequestManifest={(): void => {
        // Execute GTM tracking.
        trackBulkDownloadRequested(entityList, executionEnvironment);
        // Request manifest.
        run();
      }}
      setExecutionEnvironment={setExecutionEnvironment}
    />
  );
};

/**
 * Returns the download curl command for the generated manifest.
 * @param fileLocation - Request file location.
 * @param executionEnvironment - Execution environment.
 * @returns curl command.
 */
function getBulkDownloadCurlCommand(
  fileLocation?: FileLocation,
  executionEnvironment?: ExecutionEnvironment,
): string | undefined {
  const { commandLine } = fileLocation || {};
  if (!commandLine || !executionEnvironment) {
    return;
  }
  return commandLine[executionEnvironment];
}
