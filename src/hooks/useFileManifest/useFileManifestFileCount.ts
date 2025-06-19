import { useEffect } from "react";
import { Filters } from "../../common/entities";
import { FileManifestActionKind } from "../../providers/fileManifestState";
import { useCatalog } from "../useCatalog";
import { useFileManifestState } from "../useFileManifestState";
import { useFetchSummary } from "./useFetchSummary";

/**
 * Fetches the file summary count from the summary endpoint; the request excludes any filters with
 * the given facet names.
 * Dispatches the file count to the file manifest state.
 * @param initialFilters - Initial Filters.
 * @param facetNames - Facets.
 */
export const useFileManifestFileCount = (
  initialFilters: Filters | undefined = [],
  facetNames: (string | undefined)[] // Facet names to exclude from filters.
): void => {
  // File manifest dispatch.
  const { fileManifestDispatch } = useFileManifestState();

  // Determine catalog.
  const catalog = useCatalog() as string; // catalog should be defined.

  // Get filters required for fetching the summary.
  const fileCountFilters = getFileCountFilters(initialFilters, facetNames);

  // Fetch file count from summary.
  const { summary: { fileCount } = {} } = useFetchSummary(
    fileCountFilters || [],
    catalog,
    !!fileCountFilters
  );

  useEffect(() => {
    if (!fileCount) return;
    fileManifestDispatch({
      payload: { fileCount },
      type: FileManifestActionKind.UpdateFileCount,
    });
  }, [fileCount, fileManifestDispatch]);
};

/**
 * Returns the filters with the given facets excluded.
 * @param filters - Filters.
 * @param facetNames - A list of facet names to exclude from the filters.
 * @returns Filters with facets excluded.
 */
function getFileCountFilters(
  filters: Filters,
  facetNames: (string | undefined)[]
): Filters | undefined {
  // Filter out undefined facets.
  const filteredFacets = facetNames.filter(Boolean);

  // Return undefined if no facets to exclude; we don't want to fetch the summary until we have facet names to exclude
  // from the filters.
  if (filteredFacets.length === 0) return;

  // Return filters with facets excluded.
  return filters.filter(
    ({ categoryKey }) => !filteredFacets.includes(categoryKey)
  );
}
