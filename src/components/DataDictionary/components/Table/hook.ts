import {
  RowData,
  Table,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Attribute, Class } from "../../../../common/entities";
import { useDataDictionaryState } from "../../../../providers/dataDictionaryState/hooks/UseDataDictionaryState/hook";
import { useTableOptions } from "./options/hook";
import { buildClassMeta, buildTableData } from "./utils";

/**
 * Builds the data dictionary's TanStack table: one row per class attribute, tagged with its class key, with the class titles and descriptions on the table meta.
 * Table state is read from the dictionary's entry in the data dictionary state.
 * @param dictionary - Data dictionary path, used to look up the dictionary's table state.
 * @param classes - Data dictionary classes.
 * @param tableOptions - Table options, overriding the default table options; the table's data, meta and state are always set by this hook.
 * @returns The TanStack table instance.
 */
export const useTable = <T extends RowData = Attribute>(
  dictionary: string,
  classes: Class<T>[],
  tableOptions: Omit<TableOptions<T>, "data" | "getCoreRowModel">,
): Table<T> => {
  // Table data.
  const data = useMemo(() => buildTableData(classes), [classes]);

  // Default table options.
  const defaultTableOptions = useTableOptions<T>();

  // Build class meta.
  const classMeta = useMemo(() => buildClassMeta(classes), [classes]);

  // Table state.
  const { dataDictionaryState } = useDataDictionaryState();
  const { dictionaries } = dataDictionaryState;
  const { state = {} } = dictionaries?.[dictionary] || {};

  // Table instance.
  return useReactTable<T>({
    ...defaultTableOptions,
    ...tableOptions,
    data,
    meta: { classMeta },
    state,
  });
};
