import { ColumnDef, CoreOptions, RowData } from "@tanstack/react-table";
import { useMemo } from "react";
import { COLUMN_DEF } from "../../../../../components/Table/common/columnDef";
import { sortingFn } from "../../../../../components/Table/common/utils";
import { buildBaseColumnDef } from "../../../../../components/TableCreator/common/utils";
import { useConfig } from "../../../../../hooks/useConfig";
import { createCellRenderer as createCell } from "./cellFactory";

/**
 * Builds the column definitions for the table.
 * TODO(cc): Update `ColumnConfig` to follow the `ColumnDef` API of TanStack Table.
 * @returns Column definitions.
 */
export function useCoreOptionsColumns<T extends RowData>(): Pick<
  CoreOptions<T>,
  "columns"
> {
  const { entityConfig } = useConfig();
  const {
    list: { columns: columnsConfig },
  } = entityConfig;

  const columns: ColumnDef<T>[] = useMemo(
    () =>
      columnsConfig.reduce(
        (
          acc,
          {
            /**
             * Applies the custom `arrIncludesSome` filter function as the default for multi-value filtering.
             * Although `ColumnFilter["value"]` is typed as `unknown`, in practice it's consistently an array (`unknown[]`) in entity lists.
             * This custom filter function supports multi-select filtering, even when individual cell values are single strings.
             * This override of TanStack's default `arrIncludesSome` resolves a limitation where the base implementation
             * does not support matching an array of filter values against a single string cell value.
             * For range filtering, specify TanStack's `inNumberRange` filter function on the column definition.
             */
            filterFn = "arrIncludesSome",
            ...columnConfig
          }
        ) => {
          acc.push({
            ...buildBaseColumnDef<T>(columnConfig),
            cell: createCell<T>(columnConfig),
            filterFn,
            sortingFn,
          });
          return acc;
        },
        [
          /* Initialize column definitions with the "row position" column */
          COLUMN_DEF.ROW_POSITION,
          /* Initialize column definitions with the "row selection" column */
          COLUMN_DEF.ROW_SELECTION,
        ] as ColumnDef<T>[]
      ),
    [columnsConfig]
  );

  return {
    columns,
  };
}
