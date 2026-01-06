import { RowData } from "@tanstack/react-table";
import { useMemo } from "react";
import { Attribute, DataDictionaryConfig } from "../../../../common/entities";
import { useConfig } from "../../../../hooks/useConfig";
import { UseDataDictionaryConfig } from "./types";
import { throwDictionaryConfigNotFoundError } from "./utils";

export const useDataDictionaryConfig = <T extends RowData = Attribute>(
  dictionary: string,
): UseDataDictionaryConfig<T> => {
  const {
    config: { dataDictionaries: dataDictionaryConfigs },
  } = useConfig();
  // Get dictionary config by matching the current path with the data dictionary path
  const dataDictionaryConfig = useMemo(() => {
    if (!dataDictionaryConfigs?.length) return undefined;

    // Find the data dictionary with a path that matches the current route
    // We check if the current path starts with the dictionary path to handle nested routes
    return dataDictionaryConfigs.find(
      (config) => config.path === dictionary,
    ) as DataDictionaryConfig<T> | undefined;
  }, [dataDictionaryConfigs, dictionary]);

  // Throw error if the dictionary config is not found.
  if (!dataDictionaryConfig) throwDictionaryConfigNotFoundError(dictionary);

  // Get configured dictionary classes, column definitions and table options.
  return useMemo(() => {
    // Using non-null assertion (!) because we've already checked dataDictionaryConfig
    // exists above and would have thrown an error if undefined.
    return {
      classes: dataDictionaryConfig!.dataDictionary.classes,
      description: dataDictionaryConfig!.dataDictionary.description,
      tableOptions: dataDictionaryConfig!.tableOptions,
      title: dataDictionaryConfig!.dataDictionary.title,
    };
  }, [dataDictionaryConfig]);
};
