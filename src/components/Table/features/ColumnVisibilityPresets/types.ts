import type { VisibilityState } from "@tanstack/react-table";

/**
 * A named set of visible columns. A preset is on while the table's visible columns match it.
 */
export interface ColumnVisibilityPreset {
  /** Column visibility when the preset is selected: `false` hides a column, and a column not listed is visible. */
  columnVisibility: VisibilityState;
  key: string;
  label: string;
}

/**
 * Column visibility presets API added to the TanStack table instance.
 */
export interface ColumnVisibilityPresetsInstance {
  applyColumnVisibilityPreset: (key: string) => void;
  getActiveColumnVisibilityPreset: () => ColumnVisibilityPreset | undefined;
  getCanApplyColumnVisibilityPreset: (key: string) => boolean;
  getColumnVisibilityPresets: () => ColumnVisibilityPreset[];
  getIsColumnVisibilityPresetActive: (key: string) => boolean;
}

/**
 * Column visibility presets options added to the TanStack table options.
 */
export interface ColumnVisibilityPresetsOptions {
  /**
   * Column visibility presets. When set, the first preset is the table's initial column visibility, in place of
   * `initialState.columnVisibility`.
   */
  columnVisibilityPresets?: ColumnVisibilityPreset[];
}
