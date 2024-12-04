import { Filters } from "../../common/entities";
import { FILES_FACETS_STATUS } from "../../hooks/useFileManifest/common/entities";
import { findFacet } from "../../hooks/useFileManifest/common/utils";
import {
  FileManifestState,
  UpdateFileManifestPayload,
} from "../fileManifestState";

/**
 * Checks if all form facets are in a selected state.
 * The form facets are considered selected if they are present in the filters.
 * @param state - File manifest state.
 * @returns true if all form facets are fully selected.
 */
export function areAllFormFacetsSelected(state: FileManifestState): boolean {
  const { filters, selectedFormFacetNames } = state;
  for (const facetName of [...selectedFormFacetNames]) {
    if (isFacetSelected(filters, facetName)) continue;
    return false;
  }
  return true;
}

/**
 * Determines if all form facet terms are fully selected.
 * @param state - File manifest state.
 * @returns true if all form facet terms are fully selected.
 */
export function areAllFormFiltersSelected(state: FileManifestState): boolean {
  const { filesFacets, filters, selectedFormFacetNames } = state;
  for (const { categoryKey, value } of filters) {
    if (selectedFormFacetNames.has(categoryKey)) {
      const facet = findFacet(filesFacets, categoryKey);
      if (!facet) continue;
      if (value.length < facet.termCount) return false;
    }
  }
  return true;
}

/**
 * Filters out fully selected form facets from the filters.
 * @param state - File manifest state.
 * @returns filters.
 */
export function excludeFullySelectedFormFilters(
  state: FileManifestState
): Filters {
  const filters: Filters = [];
  for (const filter of state.filters) {
    if (state.selectedFormFacetNames.has(filter.categoryKey)) continue;
    filters.push(filter);
  }
  return filters;
}

/**
 * Generates the filters for a request URL based on the file manifest state.
 * Filters are returned based on the following conditions:
 * - **form terms unselected**: No filters are returned.
 * - **form terms partially selected**: All filters returned, including form filters.
 * - **form terms fully selected**: Filters returned, excluding form filters.
 * @param state - File manifest state.
 * @returns filters for the request URL.
 */
export function getRequestFilters(
  state: FileManifestState
): Filters | undefined {
  if (state.filesFacetsStatus !== FILES_FACETS_STATUS.COMPLETED) return;
  if (state.selectedFormFacetNames.size === 0) return;
  if (!areAllFormFacetsSelected(state)) return;
  // Form terms are partially selected; return filters.
  if (!areAllFormFiltersSelected(state)) return state.filters;
  // Form terms are fully selected; return filters excluding form filters.
  return excludeFullySelectedFormFilters(state);
}

/**
 * Returns true if the facet is selected i.e. present in the filters.
 * @param filters - Filters.
 * @param facetName - Facet name.
 * @returns true if the facet is selected.
 */
function isFacetSelected(filters: Filters, facetName: string): boolean {
  return filters.some(({ categoryKey }) => categoryKey === facetName);
}

/**
 * Transitions the files facets' status.
 * @param shouldTransition - True if transitioning, false otherwise.
 * @param nextStatus - Next files facets' status.
 * @param currentStatus - Current files facets' status.
 * @returns files facets' status.
 */
export function transitionFilesFacetsStatus(
  shouldTransition: boolean,
  nextStatus: FILES_FACETS_STATUS,
  currentStatus: FILES_FACETS_STATUS
): FILES_FACETS_STATUS {
  return shouldTransition ? nextStatus : currentStatus;
}

/**
 * Returns the updated files facets' status.
 * @param state - File manifest state.
 * @param payload - Update file manifest payload.
 * @returns files facets' status.
 */
export function updateFilesFacetsStatus(
  state: FileManifestState,
  payload: UpdateFileManifestPayload
): FILES_FACETS_STATUS {
  if (state.filesFacetsStatus === FILES_FACETS_STATUS.NOT_STARTED) {
    // If the current status is NOT_STARTED, transition to IN_PROGRESS if facets are loading.
    return transitionFilesFacetsStatus(
      payload.isFacetsLoading,
      FILES_FACETS_STATUS.IN_PROGRESS,
      FILES_FACETS_STATUS.NOT_STARTED
    );
  }
  if (state.filesFacetsStatus === FILES_FACETS_STATUS.IN_PROGRESS) {
    // If the current status is IN_PROGRESS, transition to COMPLETED if facets are successfully loaded.
    return transitionFilesFacetsStatus(
      payload.isFacetsSuccess,
      FILES_FACETS_STATUS.COMPLETED,
      FILES_FACETS_STATUS.IN_PROGRESS
    );
  }
  return FILES_FACETS_STATUS.COMPLETED;
}
