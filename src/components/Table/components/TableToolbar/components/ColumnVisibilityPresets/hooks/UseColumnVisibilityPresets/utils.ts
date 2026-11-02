import type { ToggleButtonGroupProps } from "@mui/material";
import type { Column, RowData, Table } from "@tanstack/react-table";
import type { MouseEvent } from "react";
import {
  applyColumnVisibilityPreset,
  getColumnVisibilityPresets,
  getGroupedColumnsHiddenByPreset,
} from "../../../../../../features/ColumnVisibilityPresets/utils";
import type { PresetButton } from "./types";

/**
 * Returns the toggle buttons for the table's presets. A preset that would hide a column the table is grouped by is
 * unavailable, with a tooltip naming the columns to ungroup.
 * @param table - Table.
 * @returns Preset buttons.
 */
export function buildPresetButtons<T extends RowData>(
  table: Table<T>,
): PresetButton[] {
  return getColumnVisibilityPresets(table).map(({ key, label }) => {
    const groupedColumns = getGroupedColumnsHiddenByPreset(table, key);
    return {
      disabled: groupedColumns.length > 0,
      key,
      label,
      tooltip: getUngroupTooltip(groupedColumns),
    };
  });
}

/**
 * Returns the toggle's change handler for the table: it applies the chosen preset.
 * @param table - Table.
 * @returns Change handler.
 */
export function getOnPresetChange<T extends RowData>(
  table: Table<T>,
): NonNullable<ToggleButtonGroupProps["onChange"]> {
  return (_: MouseEvent<HTMLElement>, key: string | null): void =>
    onPresetChange(table, key);
}

/**
 * Returns the tooltip for a preset that would hide grouped columns, e.g. "Ungroup Organism and Level to use this
 * preset", or an empty string (no tooltip) when there are none.
 * @param columns - Grouped columns the preset would hide.
 * @returns Tooltip.
 */
export function getUngroupTooltip<T extends RowData>(
  columns: Column<T>[],
): string {
  if (columns.length === 0) return "";
  const names = columns.map(getColumnName);
  const list =
    names.length === 1
      ? names[0]
      : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
  return `Ungroup ${list} to use this preset`;
}

/**
 * Applies the chosen preset. A null key, emitted when the selected preset is clicked again, is ignored, as is a preset
 * that can't be applied.
 * @param table - Table.
 * @param key - Chosen preset key, or null.
 */
export function onPresetChange<T extends RowData>(
  table: Table<T>,
  key: string | null,
): void {
  if (!key) return;
  applyColumnVisibilityPreset(table, key);
}

/**
 * Returns the column's header when it is a string, otherwise its ID.
 * @param column - Column.
 * @returns Column name.
 */
function getColumnName<T extends RowData>(column: Column<T>): string {
  const { header } = column.columnDef;
  return typeof header === "string" ? header : column.id;
}
