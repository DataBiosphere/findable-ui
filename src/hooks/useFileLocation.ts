import {
  useRequestFileLocation,
  UseRequestFileLocationResult,
} from "./useRequestFileLocation";

const NOT_PREPENDED_WITH_FETCH_REGEX = /^(\/(?!fetch))/;

export interface UseFileLocation extends UseRequestFileLocationResult {
  fileUrl?: string;
}

export const useFileLocation = (fileUrl?: string): UseFileLocation => {
  const url = buildFetchFileUrl(fileUrl);
  const fileLocation = useRequestFileLocation(url);
  return { ...fileLocation, fileUrl: fileLocation.data?.location };
};

/**
 * Prepends "/fetch" to the path of the specified file URL, if not already included.
 * @param url - URL.
 * @returns file URL with path prepended with "/fetch".
 */
export function buildFetchFileUrl(url?: string): string | undefined {
  if (!url) {
    return;
  }
  try {
    const urlObj = new URL(url);
    urlObj.pathname = urlObj.pathname.replace(
      NOT_PREPENDED_WITH_FETCH_REGEX,
      "/fetch/"
    );
    return urlObj.href;
  } catch {
    throw new Error(`Invalid file URL: ${url}`);
  }
}
