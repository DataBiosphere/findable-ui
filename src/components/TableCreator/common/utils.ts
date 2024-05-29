import { ColumnDef } from "@tanstack/react-table";
import { BaseColumnConfig } from "./entities";

/**
 * Builds a base column definition.
 * @param baseColumnConfig - Base column configuration.
 * @returns column definition.
 */
export function buildBaseColumnDef<T, TValue>(
  baseColumnConfig: BaseColumnConfig<T, TValue>
): ColumnDef<T> {
  const {
    columnPinned,
    disableHiding,
    disableSorting,
    header,
    id,
    meta,
    width,
  } = baseColumnConfig;
  return {
    accessorKey: id,
    enableHiding: !disableHiding,
    enableSorting: !disableSorting,
    header,
    id,
    meta: {
      columnPinned,
      header: meta ? meta.header : header,
      width,
    },
  };
}
