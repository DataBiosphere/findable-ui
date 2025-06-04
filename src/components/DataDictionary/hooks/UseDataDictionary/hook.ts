import { RowData } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Attribute, DataDictionaryConfig } from "../../../../common/entities";
import { useConfig } from "../../../../hooks/useConfig";
import { buildClassesOutline } from "../../components/Outline/utils";
import { useTable } from "../../components/Table/hook";
import { UseDataDictionary } from "./types";

export const useDataDictionary = <
  T extends RowData = Attribute
>(): UseDataDictionary<T> => {
  const {
    config: { dataDictionaries: dataDictionaryConfigs },
  } = useConfig();
  // Dynamic paths must be resolved at this point otherwise the inital settings
  // passed to useTable on subsequent renders will be ignored (as the table will have
  // already been initialized).
  const router = useRouter();
  const currentPath = router.asPath;

  // Get dictionary config by matching the current path with the data dictionary path
  const dataDictionaryConfig = useMemo(() => {
    if (!dataDictionaryConfigs?.length) return undefined;

    // Find the data dictionary with a path that matches the current route
    // We check if the current path starts with the dictionary path to handle nested routes
    return dataDictionaryConfigs.find((config) =>
      currentPath.startsWith(config.path)
    ) as DataDictionaryConfig<T> | undefined;
  }, [dataDictionaryConfigs, currentPath]);

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

  // Build outline.
  const outline = buildClassesOutline<T>(table);

  return { outline, table, title };
};
