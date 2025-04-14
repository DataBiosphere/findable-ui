import { useMemo } from "react";
import { useConfig } from "../../../../hooks/useConfig";
import { UseDataDictionary } from "./types";

export const useDataDictionary = (): UseDataDictionary => {
  const {
    config: { dataDictionaries: dataDictionaryConfigs },
  } = useConfig();

  const dataDictionaryConfig = dataDictionaryConfigs?.[0]; // TODO: Handle multiple data dictionaries
  return useMemo(() => {
    const classes = dataDictionaryConfig?.dataDictionary?.classes || [];
    const columnDefs = dataDictionaryConfig?.columnDefs || [];
    return { classes, columnDefs };
  }, [dataDictionaryConfig]);
};
