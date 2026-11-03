import type { RowData, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { getActiveColumnVisibilityPreset } from "../../../../../../features/ColumnVisibilityPresets/utils";
import type { UseColumnVisibilityPresets } from "./types";
import { buildPresetButtons, getOnPresetChange } from "./utils";

/**
 * Returns the preset toggle's buttons, value and change handler, read from the table on every render: the value is the
 * preset whose columns match the visible columns, or null when none does. Choosing a preset applies its columns.
 * Uses the feature's functions rather than the table's feature methods, so it works on a table without the
 * COLUMN_VISIBILITY_PRESETS feature registered.
 * @param table - Table.
 * @returns The toggle's buttons, value and change handler.
 */
export const useColumnVisibilityPresets = <T extends RowData>(
  table: Table<T>,
): UseColumnVisibilityPresets => {
  const onChange = useMemo(() => getOnPresetChange(table), [table]);
  return {
    onChange,
    presets: buildPresetButtons(table),
    value: getActiveColumnVisibilityPreset(table)?.key ?? null,
  };
};
