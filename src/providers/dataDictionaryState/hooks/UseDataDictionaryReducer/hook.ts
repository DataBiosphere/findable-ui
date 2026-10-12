import { useReducer } from "react";
import { initializer } from "../../initializer/initializer";
import { dataDictionaryReducer } from "../../reducer";
import { DataDictionaryStateContextProps } from "../../types";
import { useDataDictionaryInitialArgs } from "../UseDataDictionaryInitialArgs/hook";

/**
 * Creates the data dictionary state reducer, initialized from the site config's data dictionaries.
 * @returns The data dictionary state and dispatch.
 */
export const useDataDictionaryReducer = (): DataDictionaryStateContextProps => {
  const initialArgs = useDataDictionaryInitialArgs();

  const [dataDictionaryState, dataDictionaryDispatch] = useReducer(
    dataDictionaryReducer,
    initialArgs,
    initializer,
  );

  return { dataDictionaryDispatch, dataDictionaryState };
};
