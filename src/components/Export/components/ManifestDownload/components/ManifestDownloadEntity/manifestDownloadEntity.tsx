import { JSX } from "react";
import { Filters } from "../../../../../../common/entities";
import { useFileManifest } from "../../../../../../hooks/useFileManifest/useFileManifest";
import { ManifestDownloadFormat } from "../../../../common/entities";
import { FileManifestDownload } from "./components/FileManifestDownload/fileManifestDownload";
import { FileManifestSpreadsheet } from "./components/FileManifestSpreadsheet/fileManifestSpreadsheet";

/**
 * Props for the ManifestDownloadEntity component.
 */
export interface ManifestDownloadEntityProps {
  filters: Filters; // Initializes manifest download filters.
  manifestDownloadFormat?: ManifestDownloadFormat;
  metadataFilters: Filters; // Metadata filters filters.
}

/**
 * Manifest downloads for a single entity: the metadata spreadsheet and the
 * file manifest. The manifestDownloadFormat prop is unused; the file manifest
 * is requested in the compact format.
 * @param props - Component props.
 * @param props.filters - Filters the file manifest is initialized and requested with.
 * @param props.metadataFilters - Filters for the metadata spreadsheet.
 * @returns The metadata and file manifest sections.
 */
export const ManifestDownloadEntity = ({
  filters,
  metadataFilters,
}: ManifestDownloadEntityProps): JSX.Element => {
  useFileManifest(filters, undefined);
  return (
    <>
      <FileManifestSpreadsheet filters={metadataFilters} />
      <FileManifestDownload filters={filters} />
    </>
  );
};
