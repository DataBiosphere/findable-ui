import { useContext } from "react";
import { DataDictionaryStateContext } from "../../context";
import { DataDictionaryStateContextProps } from "../../types";

/**
 * Returns data dictionary state context.
 * @returns data dictionary state context.
 */
export const useDataDictionaryState = (): DataDictionaryStateContextProps => {
  return useContext(DataDictionaryStateContext);
};
