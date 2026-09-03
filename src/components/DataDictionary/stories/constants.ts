import { ColumnDef, TableOptions } from "@tanstack/react-table";
import slugify from "slugify";
import { Attribute } from "../../../common/entities";
import { DetailCell, FieldCell } from "./cells";
import { getRequiredLabel } from "./utils";

export const DICTIONARY_PATH = "tier-1";

/**
 * Mirrors the shape the data-portal renders: `classKey` groups the rows, `field`
 * and `details` are the only visible columns, and the rest are hidden and exist
 * to drive the filters panel and the global search.
 */
export const COLUMN_DEFS: ColumnDef<Attribute, unknown>[] = [
  {
    accessorKey: "classKey",
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableGrouping: true,
    header: "Class Key",
    id: "classKey",
  },
  {
    cell: FieldCell,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    header: "Field",
    id: "field",
    meta: { columnPinned: true, width: { max: "496px", min: "352px" } },
  },
  {
    cell: DetailCell,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    header: "Description",
    id: "details",
    meta: { width: { max: "1fr", min: "396px" } },
  },
  /* COLUMN FILTERS */
  {
    accessorFn: (row) => getRequiredLabel(row.required),
    enableColumnFilter: true,
    enableGlobalFilter: false,
    enableHiding: false,
    filterFn: "arrIncludesSome",
    header: "Required",
    id: "required",
  },
  {
    accessorFn: (row) => row.annotations?.tier ?? "None",
    enableColumnFilter: true,
    enableGlobalFilter: false,
    enableHiding: false,
    filterFn: "arrIncludesSome",
    header: "Tier",
    id: "tier",
  },
  /* GLOBAL FILTERS */
  {
    accessorKey: "description",
    enableColumnFilter: false,
    enableGlobalFilter: true,
    header: "Description",
    id: "description",
  },
  {
    accessorKey: "name",
    enableColumnFilter: false,
    enableGlobalFilter: true,
    header: "Name",
    id: "name",
  },
  {
    accessorKey: "title",
    enableColumnFilter: false,
    enableGlobalFilter: true,
    header: "Title",
    id: "title",
  },
];

export const TABLE_OPTIONS: Omit<
  TableOptions<Attribute>,
  "data" | "getCoreRowModel"
> = {
  columns: COLUMN_DEFS,
  getRowId: (row) => slugify(row.name),
  initialState: {
    columnVisibility: {
      description: false,
      name: false,
      required: false,
      tier: false,
      title: false,
    },
    grouping: ["classKey"],
  },
};
