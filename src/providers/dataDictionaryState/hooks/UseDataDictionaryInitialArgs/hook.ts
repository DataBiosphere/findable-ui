import { DataDictionaryConfig } from "../../../../common/entities";
import { useConfig } from "../../../../hooks/useConfig";
import { UseDataDictionaryInitialArgs } from "./types";

export const useDataDictionaryInitialArgs =
  (): UseDataDictionaryInitialArgs => {
    const { config } = useConfig();

    const dataDictionaries = config.dataDictionaries as
      | DataDictionaryConfig[]
      | undefined;

    return { dataDictionaries };
  };
