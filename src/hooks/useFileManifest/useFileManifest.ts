import { useFileManifestState } from "../useFileManifestState";
import {
  METHOD,
  useRequestFileLocation,
  UseRequestFileLocationResult,
} from "../useRequestFileLocation";

/**
 * Requests file manifest.
 * @param requestURL - Request URL.
 * @returns file manifest request response, function and status.
 */
export const useFileManifest = (
  requestURL?: string
): UseRequestFileLocationResult => {
  const { fileManifestState } = useFileManifestState();
  const url = requestURL || fileManifestState.requestURL;
  return useRequestFileLocation(url, METHOD.PUT);
};
