import { API_FILE_LOCATION_FETCH } from "../apis/azul/common/constants";
import {
  useRequestFileLocation,
  UseRequestFileLocationResult,
} from "./useRequestFileLocation";

export interface UseFileLocation extends UseRequestFileLocationResult {
  fileUrl?: string;
}

export const useFileLocation = (fileUrl?: string): UseFileLocation => {
  // Prepend "/fetch" to the path of the specified file URL, if not already included.
  const url = buildFetchFileUrl(fileUrl);
  const fileLocation = useRequestFileLocation(url);
  const { data } = fileLocation;
  const { location } = data || {};
  return { ...fileLocation, fileUrl: location };
};

/**
 * Prepends "/fetch" to the path of the specified file URL, if not already included.
 * @param fileUrl - File url.
 * @returns file url with path prepended with "/fetch".
 */
function buildFetchFileUrl(fileUrl?: string): string | undefined {
  if (!fileUrl) {
    return;
  }
  const url = new URL(fileUrl);
  const path = url.pathname;
  if (!path.includes(API_FILE_LOCATION_FETCH)) {
    url.pathname = `${API_FILE_LOCATION_FETCH}${path}`;
  }
  return url.toString();
}
