import {
  FILE_MANIFEST_TYPE,
  FILES_FACETS_STATUS,
} from "../../hooks/useFileManifest/common/entities";
import { FileManifestState } from "../fileManifestState";

export const ENTITIES_FILE_MANIFEST_TYPES: FILE_MANIFEST_TYPE[] = [
  FILE_MANIFEST_TYPE.BULK_DOWNLOAD,
  FILE_MANIFEST_TYPE.DOWNLOAD_MANIFEST,
  FILE_MANIFEST_TYPE.EXPORT_TO_TERRA,
];

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
  summary: undefined,
};
