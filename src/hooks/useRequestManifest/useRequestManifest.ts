import { ManifestDownloadFormat } from "../../apis/azul/common/entities";
import { FormFacet } from "../../components/Export/common/entities";
import { useCatalog } from "../useCatalog";
import { useConfig } from "../useConfig";
import { useFileManifestState } from "../useFileManifestState";
import { REQUEST_MANIFEST } from "./constants";
import { UseRequestManifest } from "./types";
import {
  buildRequestFilters,
  buildRequestManifest,
  isCatalogReady,
  isFileManifestFormatReady,
  isFileManifestStateReady,
  isFormSelectionReady,
} from "./utils";

/**
 * Returns file manifest request method, params and URL.
 * @param fileManifestFormat - File manifest format.
 * @param formFacet - Object containing form related facets.
 * @returns file manifest request method, params and URL.
 */
export const useRequestManifest = (
  fileManifestFormat: ManifestDownloadFormat | undefined,
  formFacet: FormFacet
): UseRequestManifest => {
  // Retrieve the endpoint URL from configured data source.
  const config = useConfig();
  const endpointUrl = config.config.dataSource.url;
  // Determine catalog.
  const catalog = useCatalog();
  // Retrieve file manifest state.
  const { fileManifestState } = useFileManifestState();
  // Return file manifest request method etc. when conditions are met.
  if (
    isCatalogReady(catalog) &&
    isFileManifestFormatReady(fileManifestFormat) &&
    isFileManifestStateReady(fileManifestState) &&
    isFormSelectionReady(formFacet)
  ) {
    return buildRequestManifest(
      endpointUrl,
      catalog as string, // Catalog is defined.
      buildRequestFilters(fileManifestState, formFacet),
      fileManifestFormat as ManifestDownloadFormat // Manifest format is defined.
    );
  }
  return REQUEST_MANIFEST;
};
