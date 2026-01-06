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
