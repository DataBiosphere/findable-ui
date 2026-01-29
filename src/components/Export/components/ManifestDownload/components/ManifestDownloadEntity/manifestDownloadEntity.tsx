import { JSX } from "react";
import { Filters } from "../../../../../../common/entities";
import { useFileManifest } from "../../../../../../hooks/useFileManifest/useFileManifest";
import { ManifestDownloadFormat } from "../../../../common/entities";
import { FileManifestDownload } from "./components/FileManifestDownload/fileManifestDownload";
import { FileManifestSpreadsheet } from "./components/FileManifestSpreadsheet/fileManifestSpreadsheet";

export interface ManifestDownloadEntityProps {
  filters: Filters; // Initializes manifest download filters.
  manifestDownloadFormat?: ManifestDownloadFormat;
  metadataFilters: Filters; // Metadata filters filters.
}

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
