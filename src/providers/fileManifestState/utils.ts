import { Filters } from "../../common/entities";
import { FILES_FACETS_STATUS } from "../../hooks/useFileManifest/common/entities";
import { findFacet } from "../../hooks/useFileManifest/common/utils";
import {
  FileManifestState,
  UpdateFileManifestPayload,
} from "../fileManifestState";

/**
 * Determines if all form facet terms are fully selected.
 * @param state - File manifest state.
 * @returns true if all form facet terms are fully selected.
 */
export function areAllFormFiltersSelected(state: FileManifestState): boolean {
  const { filesFacets, filters, setOfFormFacetNames } = state;
  for (const { categoryKey, value } of filters) {
    if (setOfFormFacetNames.has(categoryKey)) {
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
    if (state.setOfFormFacetNames.has(filter.categoryKey)) continue;
    filters.push(filter);
  }
  return filters;
}

/**
 * Generates the filters for a request URL based on the file manifest state.
 * If all terms in a facet are selected, the corresponding facet is excluded.
 * @param state - File manifest state.
 * @returns filters for the request URL.
 */
export function getRequestFilters(
  state: FileManifestState
): Filters | undefined {
  if (state.filesFacetsStatus !== FILES_FACETS_STATUS.COMPLETED) return;
  // Form facets are not defined (no form terms have been selected).
  if (state.setOfFormFacetNames.size === 0) return;
  // Form terms are partially selected; return filters.
  if (!areAllFormFiltersSelected(state)) return state.filters;
  // Form terms are fully selected; return filters excluding form filters.
  return excludeFullySelectedFormFilters(state);
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
