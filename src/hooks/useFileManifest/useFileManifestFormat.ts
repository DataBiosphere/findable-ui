import { Dispatch, SetStateAction, useState } from "react";
import { ManifestDownloadFormat } from "../../components/Export/common/entities";

export interface FileManifestFormatState {
  fileManifestFormat: ManifestDownloadFormat | undefined;
  setFileManifestFormat: Dispatch<
    SetStateAction<ManifestDownloadFormat | undefined>
  >;
}

/**
 * Facilitates the management of file manifest format state.
 * @param manifestDownloadFormat - The initial manifest download format used to fetch the file manifest.
 * @returns The file manifest format state and a function to set the file manifest format.
 */
export const useFileManifestFormat = (
  manifestDownloadFormat?: ManifestDownloadFormat
): FileManifestFormatState => {
  const [fileManifestFormat, setFileManifestFormat] = useState<
    ManifestDownloadFormat | undefined
  >(manifestDownloadFormat);
  return { fileManifestFormat, setFileManifestFormat };
};
