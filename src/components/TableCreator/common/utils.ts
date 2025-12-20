import { ColumnDef } from "@tanstack/react-table";
import { ColumnConfig } from "../../../config/entities";

/**
 * Builds a base column definition.
 * The following properties are set by default:
 * - Grouping is not enabled `enableGrouping: false`.
 * - Sorting is enabled - `enableSorting: true`.
 * @param baseColumnConfig - Base column configuration.
 * @returns column definition.
 */
export function buildBaseColumnDef<T>(
  baseColumnConfig: ColumnConfig<T>,
): ColumnDef<T> {
  const {
    columnPinned,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Destructure to avoid passing it to the columnDef.
    componentConfig,
    header,
    id,
    meta,
    width,
    ...columnDef
  } = baseColumnConfig;
  return {
    ...columnDef,
    accessorKey: id,
    header,
    id,
    meta: {
      columnPinned,
      header: typeof header === "string" ? header : undefined,
      width,
      ...meta,
    },
  };
}
