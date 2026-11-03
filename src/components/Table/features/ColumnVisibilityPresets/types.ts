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
   * Column visibility presets. When the table's initial state is built with `getInitialColumnVisibilityState`, as
   * findable-ui's index table does, the first preset is the table's initial column visibility, in place of
   * `initialState.columnVisibility`. Registering the feature alone doesn't change the initial visibility: a table built
   * another way must set it, e.g. from `getInitialColumnVisibilityState`. List any always-hidden columns (e.g. columns
   * that can't be hidden and are only used for filtering) as hidden in the first preset. Applying a preset only changes
   * columns that can be hidden, so always-hidden columns stay hidden.
   */
  columnVisibilityPresets?: ColumnVisibilityPreset[];
}
