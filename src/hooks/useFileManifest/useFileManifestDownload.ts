import { useEffect } from "react";
import { MANIFEST_DOWNLOAD_FORMAT } from "../../apis/azul/common/entities";
import { Filters } from "../../common/entities";
import { BULK_DOWNLOAD_EXECUTION_ENVIRONMENT } from "../../components/Export/common/entities";
import { useCatalog } from "../useCatalog";
import { FileLocation } from "../useRequestFileLocation";
import { buildFileManifestRequestURL } from "./common/buildFileManifestRequestURL";
import { useFileManifest } from "./useFileManifest";
import { useFileManifestURL } from "./useFileManifestURL";

export interface ManifestDownload {
  fileName?: string;
  isIdle: boolean;
  isLoading: boolean;
  manifestURL?: string;
}

/**
 * Returns file manifest download url and file name.
 * @param filters - Filters.
 * @param disabled - Disabled.
 * @returns file manifest download url and file name.
 */
export const useFileManifestDownload = (
  filters: Filters,
  disabled: boolean
): ManifestDownload => {
  // Determine file manifest request data URL.
  const URL = useFileManifestURL();
  // Determine catalog.
  const catalog = useCatalog() as string; // catalog should be defined.
  // Build request URL.
  const { requestURL } =
    buildFileManifestRequestURL(
      URL,
      filters,
      catalog,
      MANIFEST_DOWNLOAD_FORMAT.COMPACT
    ) || {};
  const { data, isIdle, isLoading, run } = useFileManifest(requestURL);
  const manifestURL = getManifestDownloadURL(data);
  const fileName = getManifestDownloadFileName(data);

  // Requests file manifest.
  useEffect(() => {
    if (disabled) return;
    run();
  }, [disabled, requestURL, run]);

  return {
    fileName,
    isIdle,
    isLoading,
    manifestURL,
  };
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

/**
 * Returns the manifest download file name for the generated manifest.
 * @param fileLocation - File location.
 * @returns manifest download file name.
 */
function getManifestDownloadFileName(
  fileLocation?: FileLocation
): string | undefined {
  if (!fileLocation) {
    return;
  }
  const fileName = getFileNameFromLocation(fileLocation.location);
  if (fileName) {
    return fileName;
  }
  return getFileNameFromBash(fileLocation.commandLine);
}

/**
 * Returns the file name from the specified bash command line, if it exists.
 * @param commandLine - Command line.
 * @returns file name.
 */
function getFileNameFromBash(
  commandLine?: FileLocation["commandLine"]
): string | undefined {
  if (!commandLine) {
    return;
  }
  return commandLine[BULK_DOWNLOAD_EXECUTION_ENVIRONMENT.BASH]
    .split("'")
    .filter((b) => b.includes("tsv"))
    .shift();
}

/**
 * Returns the file name from the specified file location, if it exists.
 * @param location - File location.
 * @returns file name.
 */
function getFileNameFromLocation(
  location: FileLocation["location"]
): string | undefined {
  const searchParams = new URL(location).searchParams;
  const paramValue = searchParams.get("response-content-disposition");
  if (!paramValue) {
    return;
  }
  const match = paramValue.match(/filename=([^&;]*)/);
  return match?.[1].replace(/"/g, "");
}
