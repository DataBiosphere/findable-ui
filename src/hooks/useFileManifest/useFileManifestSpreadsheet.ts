import { useEffect, useMemo } from "react";
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

export interface ManifestSpreadsheet {
  exists?: boolean;
  fileFormat?: string;
  fileName?: string;
  fileUrl?: string;
}

/**
 * Returns file manifest spreadsheet.
 * @param filters - Filters.
 * @param disabled - Disabled.
 * @returns file manifest spreadsheet.
 */
export const useFileManifestSpreadsheet = (
  filters: Filters,
  disabled: boolean
): ManifestSpreadsheet | undefined => {
  // Determine catalog.
  const catalog = useCatalog() as string; // catalog should be defined.
  // Build request params.
  const requestParams = fetchQueryParams(filters, catalog, { size: "25" });
  // Build request URL.
  const requestURL = useFetchRequestURL(APIEndpoints.FILES, requestParams);
  // Fetch files to determine if file exists.
  const { data, run } = useAsync<AzulEntitiesResponse>();
  // Grab manifest spreadsheet.
  const manifestSpreadsheet = useMemo(
    () => getManifestSpreadsheet(data?.hits),
    [data]
  );

  // Fetch response from files endpoint.
  useEffect(() => {
    if (disabled) return;
    run(fetchEntitiesFromURL(requestURL, undefined));
  }, [disabled, requestURL, run]);

  return manifestSpreadsheet;
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
): ManifestSpreadsheet | undefined {
  if (!files) {
    return;
  }
  // Handle case where file does not exist.
  if (files.length === 0) {
    return {
      exists: false,
    };
  }
  // Project manifest spreadsheet exists.
  const file = files[0];
  return {
    exists: true,
    fileFormat: file.files[0]?.format,
    fileName: file.files[0]?.name,
    fileUrl: buildFetchFileUrl(file.files[0]?.url),
  };
}
