import { buildExportToTerraUrl } from "../components/Export/common/utils";
import { useConfig } from "./useConfig";
import { FileLocation } from "./useRequestFileLocation";

/**
 * Returns the export to Terra response URL for the given request file location.
 * @param requestParams - Export to terra request params.
 * @param fileLocation - Request file location.
 * @returns export to Terra request and response URLs.
 */
export const useExportToTerraResponseURL = (
  requestParams?: URLSearchParams,
  fileLocation?: FileLocation
): string | undefined => {
  const { config } = useConfig();
  const { exportToTerraUrl } = config;
  const { location } = fileLocation || {};

  if (!exportToTerraUrl || !location || !requestParams) {
    return;
  }

  // Build export to terra response URL
  return buildExportToTerraUrl(exportToTerraUrl, requestParams, location);
};
