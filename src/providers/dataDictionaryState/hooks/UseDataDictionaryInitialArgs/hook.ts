import { DataDictionaryConfig } from "../../../../common/entities";
import { useConfig } from "../../../../hooks/useConfig";
import { UseDataDictionaryInitialArgs } from "./types";

/**
 * Returns the initial arguments for the data dictionary state reducer.
 * @returns The data dictionaries from the site config.
 */
export const useDataDictionaryInitialArgs =
  (): UseDataDictionaryInitialArgs => {
    const { config } = useConfig();

    const dataDictionaries = config.dataDictionaries as
      DataDictionaryConfig[] | undefined;

    return { dataDictionaries };
  };
