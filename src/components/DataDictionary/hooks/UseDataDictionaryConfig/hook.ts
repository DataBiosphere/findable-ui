import { RowData } from "@tanstack/react-table";
import { useMemo } from "react";
import { Attribute, DataDictionaryConfig } from "../../../../common/entities";
import { useConfig } from "../../../../hooks/useConfig";
import { UseDataDictionaryConfig } from "./types";
import { throwDictionaryConfigNotFoundError } from "./utils";

/**
 * Returns the data dictionary config whose path matches the given dictionary.
 * @param dictionary - Data dictionary path.
 * @returns The dictionary's classes, description, download link, table options and title.
 * @throws Error when no data dictionary config has a matching path.
 */
export const useDataDictionaryConfig = <T extends RowData = Attribute>(
  dictionary: string,
): UseDataDictionaryConfig<T> => {
  const {
    config: { dataDictionaries: dataDictionaryConfigs },
  } = useConfig();
  // Get dictionary config by matching the given dictionary with the data dictionary path
  const dataDictionaryConfig = useMemo(() => {
    if (!dataDictionaryConfigs?.length) return undefined;

    return dataDictionaryConfigs.find(
      (config) => config.path === dictionary,
    ) as DataDictionaryConfig<T> | undefined;
  }, [dataDictionaryConfigs, dictionary]);

  // Throw error if the dictionary config is not found.
  if (!dataDictionaryConfig) throwDictionaryConfigNotFoundError(dictionary);

  // Return the dictionary's classes, description, download link, table options and title.
  return useMemo(() => {
    // Using non-null assertion (!) because we've already checked dataDictionaryConfig
    // exists above and would have thrown an error if undefined.
    return {
      classes: dataDictionaryConfig!.dataDictionary.classes,
      description: dataDictionaryConfig!.dataDictionary.description,
      download: dataDictionaryConfig!.download,
      tableOptions: dataDictionaryConfig!.tableOptions,
      title: dataDictionaryConfig!.dataDictionary.title,
    };
  }, [dataDictionaryConfig]);
};
