import { createContext } from "react";
import { DEFAULT_DATA_DICTIONARY_STATE } from "./constants";
import { DataDictionaryStateContextProps } from "./types";

export const DataDictionaryStateContext =
  createContext<DataDictionaryStateContextProps>({
    dataDictionaryDispatch: null,
    dataDictionaryState: DEFAULT_DATA_DICTIONARY_STATE,
  });
