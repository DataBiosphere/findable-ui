import { useEffect, useState } from "react";
import { Filters } from "../../common/entities";
import { FileManifestActionKind } from "../../providers/fileManifestState";
import { useCatalog } from "../useCatalog";
import { useFileManifestState } from "../useFileManifestState";
import { useFetchSummary } from "./useFetchSummary";

/**
 * Fetches the latest file count from the summary endpoint, excluding filters
 * that match the provided species and file facet names, and updates the file manifest state.
 *
 * @param initialFilters - The initial set of filters to apply.
 * @param speciesFacetName - The facet name representing species to exclude from the summary request.
 * @param fileFacetName - The facet name representing file type to exclude from the summary request.
 */
export const useFileManifestFileCount = (
  initialFilters: Filters | undefined,
  speciesFacetName: string,
  fileFacetName: string
): void => {
  // Initial file manifest filter.
  const [initFilters] = useState(() => initialFilters);

  // File manifest dispatch.
  const { fileManifestDispatch } = useFileManifestState();

  // Determine catalog.
  const catalog = useCatalog() as string; // catalog should be defined.

  // Get filters required for fetching the summary.
  const filters = excludeFacetsFromFilters(initFilters, [
    speciesFacetName,
    fileFacetName,
  ]);

  // Fetch file count from summary.
  const { summary: { fileCount } = {} } = useFetchSummary(
    filters,
    catalog,
    true
  );

  useEffect(() => {
    fileManifestDispatch({
      payload: { fileCount },
      type: FileManifestActionKind.UpdateFileCount,
    });
  }, [fileCount, fileManifestDispatch]);
};

/**
 * Returns a new filters array with the specified facet names excluded.
 *
 * @param filters - The list of filters to process.
 * @param facetNames - The facet names to exclude from the filters.
 * @returns The filters array excluding any filters matching the provided facet names.
 */
function excludeFacetsFromFilters(
  filters: Filters | undefined,
  facetNames: string[]
): Filters {
  return (filters || []).filter(
    ({ categoryKey }) => !facetNames.includes(categoryKey)
  );
}
