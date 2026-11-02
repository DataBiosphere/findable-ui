import type { RowData, Table, TableFeature } from "@tanstack/react-table";
import type { ColumnVisibilityPreset } from "./types";
import {
  applyColumnVisibilityPreset,
  getActiveColumnVisibilityPreset,
  getCanApplyColumnVisibilityPreset,
  getColumnVisibilityPresets,
  getIsColumnVisibilityPresetActive,
} from "./utils";

/**
 * Column visibility presets: named sets of visible columns, from the `columnVisibilityPresets` table option. A preset
 * is on while the table's visible columns match it, so the feature keeps no state of its own. findable-ui's components
 * call the functions in ./utils directly, so they work on a table without this feature registered.
 */
export const COLUMN_VISIBILITY_PRESETS: TableFeature = {
  createTable: <T extends RowData>(table: Table<T>): void => {
    table.applyColumnVisibilityPreset = (key: string): void => {
      applyColumnVisibilityPreset(table, key);
    };
    table.getActiveColumnVisibilityPreset = ():
      ColumnVisibilityPreset | undefined => {
      return getActiveColumnVisibilityPreset(table);
    };
    table.getCanApplyColumnVisibilityPreset = (key: string): boolean => {
      return getCanApplyColumnVisibilityPreset(table, key);
    };
    table.getColumnVisibilityPresets = (): ColumnVisibilityPreset[] => {
      return getColumnVisibilityPresets(table);
    };
    table.getIsColumnVisibilityPresetActive = (key: string): boolean => {
      return getIsColumnVisibilityPresetActive(table, key);
    };
  },
};
