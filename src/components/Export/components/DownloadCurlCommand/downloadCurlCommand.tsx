import React, { ElementType, useState } from "react";
import { MANIFEST_DOWNLOAD_FORMAT } from "../../../../apis/azul/common/entities";
import { Filters } from "../../../../common/entities";
import { useExploreState } from "../../../../hooks/useExploreState";
import {
  FILE_MANIFEST_TYPE,
  FileManifestType,
} from "../../../../hooks/useFileManifest/common/entities";
import { useFileManifest } from "../../../../hooks/useFileManifest/useFileManifest";
import { useRequestFileManifest } from "../../../../hooks/useFileManifest/useRequestFileManifest";
import { FileLocation } from "../../../../hooks/useRequestFileLocation";
import { FileManifestState } from "../../../../providers/fileManifestState";
import {
  BULK_DOWNLOAD_EXECUTION_ENVIRONMENT,
  ExecutionEnvironment,
  FormFacet,
} from "../../common/entities";
import { bulkDownloadTracking } from "../../common/tracking";
import { DownloadCurlCommandNotStarted } from "./components/DownloadCurlCommandNotStarted/downloadCurlCommandNotStarted";
import { DownloadCurlCommandReady } from "./components/DownloadCurlCommandReady/downloadCurlCommandReady";

interface DownloadCurlCommandProps {
  DownloadCurlForm: ElementType;
  DownloadCurlStart: ElementType;
  DownloadCurlSuccess: ElementType;
  fileManifestState: FileManifestState;
  fileManifestType: FileManifestType;
  fileSummaryFacetName: string;
  filters: Filters; // Initializes bulk download filters.
  formFacet: FormFacet;
}

export const DownloadCurlCommand = ({
  DownloadCurlForm,
  DownloadCurlStart,
  DownloadCurlSuccess,
  fileManifestState,
  fileManifestType,
  fileSummaryFacetName,
  filters,
  formFacet,
}: DownloadCurlCommandProps): JSX.Element => {
  useRequestFileManifest(
    MANIFEST_DOWNLOAD_FORMAT.CURL,
    filters,
    fileSummaryFacetName
  );
  const [executionEnvironment, setExecutionEnvironment] =
    useState<ExecutionEnvironment>(BULK_DOWNLOAD_EXECUTION_ENVIRONMENT.BASH);
  const {
    exploreState: { tabValue: entityList },
  } = useExploreState();
  const { requestParams } = fileManifestState;
  const { data, isLoading, run } = useFileManifest();
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
        track(
          fileManifestType,
          entityList,
          executionEnvironment,
          requestParams
        );
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
  executionEnvironment?: ExecutionEnvironment
): string | undefined {
  const { commandLine } = fileLocation || {};
  if (!commandLine || !executionEnvironment) {
    return;
  }
  return commandLine[executionEnvironment];
}

/**
 * Executes GTM tracking.
 * @param fileManifestType - File manifest type.
 * @param index - Index.
 * @param toolName - Execution environment.
 * @param requestParams - Request params.
 */
function track(
  fileManifestType: FileManifestType,
  index: string,
  toolName: string,
  requestParams?: URLSearchParams
): void {
  if (fileManifestType === FILE_MANIFEST_TYPE.BULK_DOWNLOAD) {
    bulkDownloadTracking(index, toolName, requestParams);
  }
}
