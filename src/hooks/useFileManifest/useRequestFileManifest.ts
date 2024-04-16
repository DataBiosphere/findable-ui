import { useEffect, useState } from "react";
import { ManifestDownloadFormat } from "../../apis/azul/common/entities";
import { Filters } from "../../common/entities";
import { FileManifestActionKind } from "../../providers/fileManifestState";
import { useFileManifestState } from "../useFileManifestState";

/**
 * Initializes and fetches file manifest comprising file facets and summary for the given file manifest format.
 * @param fileManifestFormat - File manifest format.
 * @param initialFilters - Filters to initialize file manifest request.
 * @param fileSummaryFacetName - File summary facet name.
 */
export const useRequestFileManifest = (
  fileManifestFormat: ManifestDownloadFormat | undefined,
  initialFilters: Filters | undefined = [],
  fileSummaryFacetName?: string
): void => {
  // Initial file manifest filter.
  const [initFilters] = useState(() => initialFilters);

  // File manifest state.
  const { fileManifestDispatch } = useFileManifestState();

  // Fetches file manifest with the given file manifest filters, format.
  useEffect(() => {
    fileManifestDispatch({
      payload: {
        fileManifestFormat,
        fileSummaryFacetName,
        filters: initFilters,
      },
      type: FileManifestActionKind.FetchFileManifest,
    });
    return () => {
      fileManifestDispatch({
        payload: undefined,
        type: FileManifestActionKind.ClearFileManifest,
      });
    };
  }, [
    fileManifestDispatch,
    fileManifestFormat,
    fileSummaryFacetName,
    initFilters,
  ]);
};
