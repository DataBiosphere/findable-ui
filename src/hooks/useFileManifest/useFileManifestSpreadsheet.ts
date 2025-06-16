import { useCallback, useEffect, useMemo } from "react";
import {
  APIEndpoints,
  AzulEntitiesResponse,
} from "../../apis/azul/common/entities";
import { Filters } from "../../common/entities";
import { fetchEntitiesFromURL } from "../../entity/common/service";
import { fetchQueryParams } from "../../utils/fetchQueryParams";
import { useAsync } from "../useAsync";
import { useCatalog } from "../useCatalog";
import { useFetchRequestURL } from "../useFetchRequestURL";
import { useRequestFileLocation } from "../useRequestFileLocation";

export interface ManifestSpreadsheet {
  fileName?: string;
  fileUrl?: string;
  isIdle?: boolean;
  isLoading?: boolean;
  requestManifest?: () => void;
  spreadsheetUrl?: string;
}

/**
 * Returns file manifest spreadsheet.
 * @param filters - Filters.
 * @returns file manifest spreadsheet.
 */
export const useFileManifestSpreadsheet = (
  filters: Filters
): Omit<ManifestSpreadsheet, "fileUrl"> => {
  // Determine catalog.
  const catalog = useCatalog() as string; // catalog should be defined.
  // Build request params.
  const requestParams = fetchQueryParams(filters, catalog, { size: "25" });
  // Build request URL.
  const requestURL = useFetchRequestURL(APIEndpoints.FILES, requestParams);
  // Fetch files to determine if file exists.
  const {
    data: files,
    isIdle,
    isLoading: isFilesLoading,
    run: requestFiles,
  } = useAsync<AzulEntitiesResponse>();

  // Grab manifest spreadsheet.
  const { fileName, fileUrl } = useMemo(
    () => getManifestSpreadsheet(files?.hits),
    [files]
  );

  // Fetch file manifest.
  const { data, isLoading, run } = useRequestFileLocation(fileUrl);

  // Fetch response from files endpoint.
  const requestManifest = useCallback(() => {
    requestFiles(fetchEntitiesFromURL(requestURL, undefined));
  }, [requestFiles, requestURL]);

  // Fetch file manifest.
  useEffect(() => {
    run();
  }, [fileUrl, run]);

  return {
    fileName,
    isIdle,
    isLoading: isFilesLoading || isLoading,
    requestManifest,
    spreadsheetUrl: data?.location,
  };
};

/**
 * Prepend "/fetch" to the path of the specified file URL, if not already included.
 * @param fileUrl - File URL.
 * @returns File URL with "/fetch" prepended to the path.
 */
function buildFetchFileUrl(fileUrl?: string): string | undefined {
  if (!fileUrl) {
    return;
  }
  const url = new URL(fileUrl);
  const path = url.pathname;
  if (path.indexOf(APIEndpoints.FETCH) !== 0) {
    url.pathname = `${APIEndpoints.FETCH}${path}`;
  }
  return url.toString();
}

/**
 * Returns manifest spreadsheet.
 * @param files - Files.
 * @returns manifest spreadsheet.
 */
function getManifestSpreadsheet(
  files?: AzulEntitiesResponse["hits"]
): Pick<ManifestSpreadsheet, "fileName" | "fileUrl"> {
  if (!files) return { fileName: undefined, fileUrl: undefined };

  // Handle case where file does not exist.
  if (files.length === 0) return { fileName: undefined, fileUrl: undefined };

  // Project manifest spreadsheet exists.
  const file = files[0];

  return {
    fileName: file.files[0]?.name,
    fileUrl: buildFetchFileUrl(file.files[0]?.url),
  };
}
