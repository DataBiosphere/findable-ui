import { FILES_FACETS_STATUS } from "../../hooks/useFileManifest/common/entities";
import { FileManifestState } from "../fileManifestState";

export const FILE_MANIFEST_STATE: FileManifestState = {
  fileManifestFormat: undefined,
  fileManifestType: undefined,
  fileSummary: undefined,
  fileSummaryFacetName: undefined,
  fileSummaryFilters: [],
  filesFacets: [],
  filesFacetsStatus: FILES_FACETS_STATUS.NOT_STARTED,
  filters: [],
  isEnabled: false,
  isFacetsLoading: false,
  isFacetsSuccess: false,
  isFileSummaryLoading: false,
  isLoading: false,
  isSummaryLoading: false,
  requestParams: undefined,
  requestURL: undefined,
  selectedFormFacetNames: new Set(),
  summary: undefined,
};
