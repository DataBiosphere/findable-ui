import {
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  type Table,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import type { ColumnFiltersTableMeta } from "../types";
import { COLUMNS } from "./constants";
import type { Row } from "./types";
import { buildCategoryConfigs, buildRows } from "./utils";

/**
 * Story helper building a TanStack table of the story rows, with the given filter sort on its meta.
 * @param filterSort - Table meta filter sort.
 * @returns Table.
 */
export function useStoryTable(
  filterSort: ColumnFiltersTableMeta<Row>["filterSort"],
): Table<Row> {
  const data = useMemo(() => buildRows(), []);
  const meta = useMemo<ColumnFiltersTableMeta<Row>>(
    () => ({
      categoryGroups: [{ categoryConfigs: buildCategoryConfigs(), label: "" }],
      filterSort,
    }),
    [filterSort],
  );
  return useReactTable<Row>({
    columns: COLUMNS,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    meta,
  });
}
