import { RowData } from "@tanstack/react-table";
import { useMemo } from "react";
import { Attribute, DataDictionaryConfig } from "../../../../common/entities";
import { useConfig } from "../../../../hooks/useConfig";
import { UseDataDictionary } from "./types";

export const useDataDictionary = <
  T extends RowData = Attribute
>(): UseDataDictionary<T> => {
  const {
    config: { dataDictionaries: dataDictionaryConfigs },
  } = useConfig();

  const dataDictionaryConfig = dataDictionaryConfigs?.[0] as
    | DataDictionaryConfig<T>
    | undefined; // TODO: Handle multiple data dictionaries

  return useMemo(() => {
    const classes = dataDictionaryConfig?.dataDictionary?.classes || [];
    const columnDefs = dataDictionaryConfig?.columnDefs || [];
    const title = dataDictionaryConfig?.dataDictionary?.title || "";
    return { classes, columnDefs, title };
  }, [dataDictionaryConfig]);
};
