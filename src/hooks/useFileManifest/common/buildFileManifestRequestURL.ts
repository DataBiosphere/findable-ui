import {
  AZUL_PARAM,
  ManifestDownloadFormat,
} from "../../../apis/azul/common/entities";
import { transformFilters } from "../../../apis/azul/common/filterTransformer";
import { Filters } from "../../../common/entities";

export interface FileManifestRequestURL {
  requestParams: URLSearchParams;
  requestURL: string;
}

/**
 * Build up file manifest request params and URL query string for the given search results, catalog and format.
 * @param url - Data URL.
 * @param filters - Selected filters.
 * @param catalog - Configured catalog.
 * @param manifestFormat - Manifest format.
 * @returns file manifest request params and URL query string.
 */
export const buildFileManifestRequestURL = (
  url: string,
  filters: Filters,
  catalog: string,
  manifestFormat: ManifestDownloadFormat | undefined
): FileManifestRequestURL | undefined => {
  if (!manifestFormat) {
    return;
  }

  // Build request params.
  const requestParams = new URLSearchParams({
    [AZUL_PARAM.CATALOG]: catalog,
    [AZUL_PARAM.FILTERS]: transformFilters(filters),
    format: manifestFormat,
  });

  // Build file manifest URL
  const requestURL = `${url}fetch/manifest/files?${requestParams.toString()}`;

  return {
    requestParams,
    requestURL,
  };
};
