import { useContext } from "react";
import { DataDictionaryContext } from "./context";
import { DataDictionaryContextProps } from "./types";

/**
 * Returns data dictionary context.
 * @returns data dictionary context.
 */
export const useDataDictionary = (): DataDictionaryContextProps => {
  return useContext(DataDictionaryContext);
};
