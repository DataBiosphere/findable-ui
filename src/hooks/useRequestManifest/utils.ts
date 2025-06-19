import {
  AZUL_PARAM,
  MANIFEST_DOWNLOAD_FORMAT,
  ManifestDownloadFormat,
} from "../../apis/azul/common/entities";
import { transformFilters } from "../../apis/azul/common/filterTransformer";
import { Filters } from "../../common/entities";
import { FormFacet } from "../../components/Export/common/entities";
import { FileManifestState } from "../../providers/fileManifestState";
import { FileFacet } from "../useFileManifest/common/entities";
import { REQUEST_MANIFEST } from "./constants";
import { UseRequestManifest } from "./types";

/**
 * Determines whether all files are selected by comparing the file count to the summary file count.
 *
 * @param state - The file manifest state object.
 * @returns True if all files are selected; otherwise, false.
 */
export function areAllFilesSelected(state: FileManifestState): boolean {
  const { fileCount, summary } = state;

  // Return false if file count or summary file count is undefined.
  if (fileCount === undefined || summary?.fileCount === undefined) return false;

  // Return true if file count equals summary file count.
  return fileCount === summary.fileCount;
}

/**
 * Builds the filters object for a request URL based on the file manifest state and form facets.
 *
 * - If all files are selected, returns filters from state excluding fully selected form filters.
 * - If only some files are selected, returns the current filters from state.
 *
 * @param state - The file manifest state object.
 * @param formFacet - The form-related file facets.
 * @returns The filters to use for the request URL.
 */
export function buildRequestFilters(
  state: FileManifestState,
  formFacet: FormFacet
): Filters {
  // Return filters from state excluding form filters if all files are selected.
  if (areAllFilesSelected(state)) {
    return excludeFullySelectedFormFilters(state, formFacet);
  }

  // Return current filters from state.
  return state.filters;
}

/**
 * Build up file manifest request params and URL query string for the given search results, catalog and format.
 * @param endpointUrl - Data URL.
 * @param catalog - Configured catalog.
 * @param filters - Selected filters.
 * @param manifestFormat - Manifest format.
 * @returns file manifest request params and URL query string.
 */
export function buildRequestManifest(
  endpointUrl: string,
  catalog: string,
  filters: Filters,
  manifestFormat: ManifestDownloadFormat
): Required<UseRequestManifest> {
  const requestParams = new URLSearchParams({
    [AZUL_PARAM.CATALOG]: catalog,
    [AZUL_PARAM.FILTERS]: transformFilters(filters),
    format: manifestFormat,
  });
  const requestUrl = `${endpointUrl}fetch/manifest/files?${requestParams.toString()}`;
  return {
    ...REQUEST_MANIFEST,
    requestParams,
    requestUrl,
  };
}

/**
 * Returns filters, without form related filters.
 * @param state - File manifest state.
 * @param formFacet - Form related file facets.
 * @returns filters.
 */
export function excludeFullySelectedFormFilters(
  state: FileManifestState,
  formFacet: FormFacet
): Filters {
  const filters: Filters = [];
  const formFacetNames = getFormFacetNamesSet(formFacet);
  for (const filter of state.filters) {
    if (formFacetNames.has(filter.categoryKey)) continue;
    filters.push(filter);
  }
  return filters;
}

/**
 * Returns a set of form facet names.
 * @param formFacet - Form related file facets.
 * @returns set of form facet names.
 */
function getFormFacetNamesSet(formFacet: FormFacet): Set<string> {
  return new Set(
    Object.values(formFacet)
      .filter(Boolean)
      .map(({ name }: FileFacet) => name)
  );
}

/**
 * Returns true if the catalog is defined.
 * The catalog is defined via the configuration and is required for the file manifest request.
 * @param catalog - Catalog.
 * @returns true if the catalog is defined.
 */
export function isCatalogReady(catalog: string | undefined): boolean {
  return typeof catalog === "string";
}

/**
 * Determines if the file manifest state is ready to be used in a request.
 *
 * The state is considered ready when:
 * - isEnabled is true
 * - fileCount is defined
 * - isLoading is false
 *
 * @param fileManifestState - File manifest state.
 * @returns true if the file manifest state is ready.
 */
export function isFileManifestStateReady(
  fileManifestState: FileManifestState
): boolean {
  return (
    fileManifestState.isEnabled &&
    fileManifestState.fileCount !== undefined &&
    !fileManifestState.isLoading
  );
}

/**
 * Checks if the file manifest format is ready for use.
 * The file manifest format is considered ready if `fileManifestFormat` is defined.
 * @param fileManifestFormat - File manifest format.
 * @returns `true` if the `fileManifestFormat` is defined.
 */
export function isFileManifestFormatReady(
  fileManifestFormat: ManifestDownloadFormat | undefined
): boolean {
  if (!fileManifestFormat) return false;
  return Object.values(MANIFEST_DOWNLOAD_FORMAT).includes(fileManifestFormat);
}

/**
 * Checks if the form is ready to request a manifest.
 * A form is considered ready if all facets have the `selected` term set to `true`.
 * @param formFacet - Form related file facets.
 * @returns `true` if all facets in the form are selected.
 */
export function isFormSelectionReady(formFacet: FormFacet): boolean {
  const facets = Object.values(formFacet).filter(Boolean);
  if (facets.length === 0) return false;
  return facets.every(({ selected }: FileFacet) => selected);
}
