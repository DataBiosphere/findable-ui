import { createContext } from "react";
import { INITIAL_DATA_DICTIONARY_STATE } from "./initializer/constants";
import { DataDictionaryStateContextProps } from "./types";

export const DataDictionaryStateContext =
  createContext<DataDictionaryStateContextProps>({
    dataDictionaryDispatch: null,
    dataDictionaryState: INITIAL_DATA_DICTIONARY_STATE,
  });
