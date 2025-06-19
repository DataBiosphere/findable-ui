import { useEffect, useState } from "react";
import { Filters } from "../../common/entities";
import { FileManifestActionKind } from "../../providers/fileManifestState";
import { useCatalog } from "../useCatalog";
import { useFileManifestState } from "../useFileManifestState";
import { useFetchSummary } from "./useFetchSummary";

/**
 * Fetches the file summary count from the summary endpoint and dispatches the file count to the file manifest state.
 * @param initialFilters - Initial Filters.
 * @param speciesFacetName - Species facet name.
 * @param fileFacetName - File facet name.
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
  const fileCountFilters = filterSpeciesAndFileTypeFromFilters(initFilters, [
    speciesFacetName,
    fileFacetName,
  ]);

  // Fetch file count from summary.
  const { summary: { fileCount } = {} } = useFetchSummary(
    fileCountFilters,
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
 * Filters species and file type facets from the initial filters.
 * @param filters - Filters.
 * @param facetNames - Facet names.
 * @returns Filters with facets excluded.
 */
function filterSpeciesAndFileTypeFromFilters(
  filters: Filters | undefined,
  facetNames: string[]
): Filters {
  return (filters || []).filter(
    ({ categoryKey }) => !facetNames.includes(categoryKey)
  );
}
