import { useContext } from "react";
import {
  FileManifestStateContext,
  FileManifestStateContextProps,
} from "../providers/fileManifestState";

/**
 * Returns file manifest state context.
 * @returns file manifest  state context.
 */
export const useFileManifestState = (): FileManifestStateContextProps => {
  return useContext(FileManifestStateContext);
};
