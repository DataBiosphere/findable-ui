import { ColumnDef } from "@tanstack/react-table";
import { ColumnConfig } from "../../../config/entities";

/**
 * Builds a base column definition.
 * @param baseColumnConfig - Base column configuration.
 * @returns column definition.
 */
export function buildBaseColumnDef<T>(
  baseColumnConfig: ColumnConfig<T>
): ColumnDef<T> {
  const {
    columnPinned,
    disableHiding,
    disableSorting,
    enableGrouping = false,
    header,
    id,
    meta,
    width,
  } = baseColumnConfig;
  return {
    accessorKey: id,
    enableGrouping,
    enableHiding: !disableHiding,
    enableSorting: !disableSorting,
    header,
    id,
    meta: {
      ...meta,
      columnPinned,
      header: meta ? meta.header : header,
      width,
    },
  };
}
