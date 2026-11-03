import {
  getCoreRowModel,
  type GroupingState,
  type Table,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { getInitialColumnVisibilityState } from "../../../../../../TableCreator/options/initialState/columnVisibility";
import { COLUMN_VISIBILITY_PRESETS as COLUMN_VISIBILITY_PRESETS_FEATURE } from "../../../../../features/ColumnVisibilityPresets/constants";
import { COLUMN_VISIBILITY_PRESETS, COLUMNS, ROWS } from "./constants";
import type { Row } from "./types";

/**
 * Story helper building a TanStack table of the story rows, with column visibility presets. The initial column
 * visibility is the first preset's, unless one is given.
 * @param initialColumnVisibility - Initial column visibility, if not the first preset's.
 * @param grouping - Initial grouping.
 * @returns Table.
 */
export function useStoryTable(
  initialColumnVisibility?: VisibilityState,
  grouping: GroupingState = [],
): Table<Row> {
  return useReactTable<Row>({
    _features: [COLUMN_VISIBILITY_PRESETS_FEATURE],
    columnVisibilityPresets: COLUMN_VISIBILITY_PRESETS,
    columns: COLUMNS,
    data: ROWS,
    enableHiding: true,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnVisibility:
        initialColumnVisibility ??
        getInitialColumnVisibilityState({
          columnVisibilityPresets: COLUMN_VISIBILITY_PRESETS,
        }),
      grouping,
    },
  });
}
