import { buildExportToTerraUrl } from "../components/Export/common/utils";
import { useConfig } from "./useConfig";
import { FileLocation } from "./useRequestFileLocation";

/**
 * Returns the export to Terra response URL for the given request file location.
 * Throws once the file location is returned if the site config has no export to Terra URL.
 * @param requestParams - Export to Terra request params.
 * @param fileLocation - Request file location.
 * @returns export to Terra response URL, or undefined until the request params and file location are available.
 */
export const useExportToTerraResponseURL = (
  requestParams?: URLSearchParams,
  fileLocation?: FileLocation,
): string | undefined => {
  const { config } = useConfig();
  const { exportToTerraUrl } = config;
  const { location } = fileLocation || {};

  if (!location || !requestParams) {
    return;
  }

  if (!exportToTerraUrl) {
    throw new Error(
      "Export to Terra requires exportToTerraUrl to be set in the site config.",
    );
  }

  // Build export to terra response URL
  return buildExportToTerraUrl(exportToTerraUrl, requestParams, location);
};
