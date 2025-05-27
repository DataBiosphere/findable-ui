import { useReducer } from "react";
import { DEFAULT_DATA_DICTIONARY_STATE } from "../constants";
import { dataDictionaryReducer } from "../reducer";
import { DataDictionaryStateContextProps } from "../types";

export const useDataDictionaryReducer = (): DataDictionaryStateContextProps => {
  const [dataDictionaryState, dataDictionaryDispatch] = useReducer(
    dataDictionaryReducer,
    undefined,
    () => DEFAULT_DATA_DICTIONARY_STATE
  );
  return { dataDictionaryDispatch, dataDictionaryState };
};
