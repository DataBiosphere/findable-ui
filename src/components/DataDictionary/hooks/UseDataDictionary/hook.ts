import { RowData } from "@tanstack/react-table";
import { useMemo } from "react";
import { Attribute, DataDictionaryConfig } from "../../../../common/entities";
import { useConfig } from "../../../../hooks/useConfig";
import { useTable } from "../../components/Table/hook";
import { UseDataDictionary } from "./types";

export const useDataDictionary = <
  T extends RowData = Attribute
>(): UseDataDictionary<T> => {
  const {
    config: { dataDictionaries: dataDictionaryConfigs },
  } = useConfig();

  // Get dictionary config.
  const dataDictionaryConfig = dataDictionaryConfigs?.[0] as
    | DataDictionaryConfig<T>
    | undefined; // TODO: Handle multiple data dictionaries

  // Get configured dictionary classes, column definitions and table options.
  const { classes, columnDefs, tableOptions, title } = useMemo(() => {
    return {
      classes: dataDictionaryConfig?.dataDictionary?.classes || [],
      columnDefs: dataDictionaryConfig?.columnDefs || [],
      tableOptions: dataDictionaryConfig?.tableOptions || {},
      title: dataDictionaryConfig?.dataDictionary?.title || "",
    };
  }, [dataDictionaryConfig]);

  // Build table instance.
  const table = useTable<T>(classes, columnDefs, tableOptions);

  return { classes, table, title };
};
