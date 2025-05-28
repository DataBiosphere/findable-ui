import {
  ColumnDef,
  RowData,
  Table,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Attribute, Class } from "../../../../common/entities";
import { useDataDictionaryState } from "../../../../providers/dataDictionary/hooks/UseDataDictionaryState/hook";
import { useTableOptions } from "./options/hook";
import { buildClassMeta, buildTableData } from "./utils";

export const useTable = <T extends RowData = Attribute>(
  classes: Class<T>[],
  columnDefs: ColumnDef<T>[],
  tableOptions?: Omit<TableOptions<T>, "columns" | "data" | "getCoreRowModel">
): Table<T> => {
  // Table data.
  const [data] = useState<T[]>(() => buildTableData(classes));

  // Table columns.
  const [columns] = useState<ColumnDef<T>[]>(() => columnDefs);

  // Table state.
  const { dataDictionaryState } = useDataDictionaryState();
  const { columnFilters } = dataDictionaryState;
  const state = { columnFilters };

  // Default table options.
  const defaultTableOptions = useTableOptions<T>();

  // Build class meta.
  const classMeta = useMemo(() => buildClassMeta(classes), [classes]);

  // Table instance.
  return useReactTable<T>({
    ...defaultTableOptions,
    ...tableOptions,
    columns,
    data,
    meta: { classMeta },
    state,
  });
};
