import { useEffect, useState } from "react";
import { Filters } from "../../common/entities";
import { FileManifestActionKind } from "../../providers/fileManifestState";
import { useFileManifestState } from "../useFileManifestState";

/**
 * Initializes the file manifest with specified filters and a file summary facet name.
 * This hook sets up the file manifest state by dispatching an action to fetch the manifest
 * based on the provided initial filters and file summary facet name. It also ensures that
 * the manifest state is cleared when the component is unmounted.
 * @param initialFilters - The initial filters used to fetch the file manifest.
 * @param fileSummaryFacetName - The name of the file summary facet to be used in the file manifest request.
 */
export const useFileManifest = (
  initialFilters: Filters | undefined = [],
  fileSummaryFacetName?: string,
): void => {
  // Initial file manifest filter.
  const [initFilters] = useState(() => initialFilters);

  // File manifest state.
  const { fileManifestDispatch } = useFileManifestState();

  // Fetches file manifest with the given file manifest filters, format.
  useEffect(() => {
    fileManifestDispatch({
      payload: {
        fileSummaryFacetName,
        filters: initFilters,
      },
      type: FileManifestActionKind.FetchFileManifest,
    });
    return (): void => {
      fileManifestDispatch({
        payload: undefined,
        type: FileManifestActionKind.ClearFileManifest,
      });
    };
  }, [fileManifestDispatch, fileSummaryFacetName, initFilters]);
};
