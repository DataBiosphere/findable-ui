import { Filters } from "../../common/entities";
import {
  FileFacet,
  FILES_FACETS_STATUS,
} from "../../hooks/useFileManifest/common/entities";
import { findFacet } from "../../hooks/useFileManifest/common/utils";
import {
  FileManifestState,
  UpdateFileManifestPayload,
} from "../fileManifestState";
import { ENTITIES_FILE_MANIFEST_TYPES } from "./constants";

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
  // Determine if the filters are user-selected.
  if (isFiltersUserSelected(state)) {
    return state.filters;
  }
  for (const filter of state.filters) {
    const facet = findFacet(state.filesFacets, filter.categoryKey);
    if (!facet) return [filter]; // The entity identifier related filter will not have a corresponding term facet.
  }
}

/**
 * Returns true if filter values for each selected facet are partially selected.
 * @param filters - Selected filters.
 * @param filesFacets - Files facets.
 * @returns true if the filters are partially selected.
 */
function isFiltersPartiallySelected(
  filters: Filters,
  filesFacets: FileFacet[]
): boolean {
  for (const { categoryKey, value } of filters) {
    const facet = findFacet(filesFacets, categoryKey);
    if (!facet) continue; // Continue; the entity identifier related filter will not have a corresponding term facet.
    if (value.length < facet.termCount) return true;
  }
  return false;
}

/**
 * Returns true if the filters are user-selected, when:
 * - The file manifest type is not set.
 * - The file manifest type is an entity list related type.
 * - Filter values for each selected facet are partially selected.
 * @param state - File manifest state.
 * @returns true if the filters are user-selected.
 */
export function isFiltersUserSelected(state: FileManifestState): boolean {
  if (!state.fileManifestType) return true;
  if (ENTITIES_FILE_MANIFEST_TYPES.includes(state.fileManifestType))
    return true;
  return isFiltersPartiallySelected(state.filters, state.filesFacets);
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
