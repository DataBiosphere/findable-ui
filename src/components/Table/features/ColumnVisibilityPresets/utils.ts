import type {
  Column,
  GroupingState,
  RowData,
  Table,
  VisibilityState,
} from "@tanstack/react-table";
import { getCanHideColumns } from "../../components/TableToolbar/components/ColumnVisibility/components/MenuItems/utils";
import type { ColumnVisibilityPreset } from "./types";

/**
 * Sets the table's column visibility to the preset's: every column that can be hidden takes the preset's visibility,
 * and a column the preset doesn't list is visible. Columns that can't be hidden keep their visibility. Does nothing for
 * an unknown key, or for a preset that can't be applied because it would hide a column the table is grouped by.
 * @param table - Table.
 * @param key - Preset key.
 */
export function applyColumnVisibilityPreset<T extends RowData>(
  table: Table<T>,
  key: string,
): void {
  const preset = findPreset(table, key);
  if (!preset || !getCanApplyColumnVisibilityPreset(table, key)) return;
  const visibility = Object.fromEntries(
    getHideableColumns(table).map(({ id }) => [
      id,
      getPresetVisibility(preset.columnVisibility, id),
    ]),
  );
  table.setColumnVisibility((old) => ({ ...old, ...visibility }));
}

/**
 * Throws when presets share a key, would show the same columns (a column a preset doesn't list is visible), or when
 * the first preset, which is applied on load, hides a column the table is initially grouped by.
 * @param presets - Column visibility presets.
 * @param name - Name of the table the presets belong to, for the error message.
 * @param grouping - The table's initial grouping.
 */
export function assertColumnVisibilityPresets(
  presets: ColumnVisibilityPreset[] | undefined,
  name: string,
  grouping: GroupingState = [],
): void {
  const [firstPreset] = presets ?? [];
  const hiddenGroupedId = firstPreset
    ? grouping.find(
        (id) => !getPresetVisibility(firstPreset.columnVisibility, id),
      )
    : undefined;
  if (firstPreset && hiddenGroupedId) {
    throw new Error(
      `Column visibility preset "${firstPreset.key}" for ${name} hides "${hiddenGroupedId}", which the table is initially grouped by.`,
    );
  }
  presets?.forEach((preset, i) => {
    presets.slice(i + 1).forEach((other) => {
      if (preset.key === other.key) {
        throw new Error(
          `Column visibility presets for ${name} share the key "${preset.key}".`,
        );
      }
      const columnIds = [
        ...new Set([
          ...Object.keys(preset.columnVisibility),
          ...Object.keys(other.columnVisibility),
        ]),
      ];
      if (
        isSameVisibility(
          preset.columnVisibility,
          other.columnVisibility,
          columnIds,
        )
      ) {
        throw new Error(
          `Column visibility presets "${preset.key}" and "${other.key}" for ${name} show the same columns.`,
        );
      }
    });
  });
}

/**
 * Returns the preset whose columns match the table's visible columns, if any.
 * @param table - Table.
 * @returns Active preset, or undefined when no preset matches.
 */
export function getActiveColumnVisibilityPreset<T extends RowData>(
  table: Table<T>,
): ColumnVisibilityPreset | undefined {
  const columnIds = getHideableColumnIds(table);
  return getColumnVisibilityPresets(table).find((preset) =>
    matchesPreset(table, preset, columnIds),
  );
}

/**
 * Returns true when the preset can be applied: it doesn't hide any column the table is grouped by. An unknown key is
 * false.
 * @param table - Table.
 * @param key - Preset key.
 * @returns True when the preset can be applied.
 */
export function getCanApplyColumnVisibilityPreset<T extends RowData>(
  table: Table<T>,
  key: string,
): boolean {
  if (!findPreset(table, key)) return false;
  return getGroupedColumnsHiddenByPreset(table, key).length === 0;
}

/**
 * Returns the table's column visibility presets.
 * @param table - Table.
 * @returns Column visibility presets.
 */
export function getColumnVisibilityPresets<T extends RowData>(
  table: Table<T>,
): ColumnVisibilityPreset[] {
  return table.options.columnVisibilityPresets ?? [];
}

/**
 * Returns the columns the table is grouped by that the preset would hide. Empty for an unknown key.
 * @param table - Table.
 * @param key - Preset key.
 * @returns Grouped columns the preset hides.
 */
export function getGroupedColumnsHiddenByPreset<T extends RowData>(
  table: Table<T>,
  key: string,
): Column<T>[] {
  const preset = findPreset(table, key);
  if (!preset) return [];
  return table
    .getState()
    .grouping.filter((id) => !getPresetVisibility(preset.columnVisibility, id))
    .map((id) => table.getColumn(id))
    .filter((column): column is Column<T> => Boolean(column));
}

/**
 * Returns the initial column visibility for the given presets: the first preset's, or undefined without presets.
 * @param presets - Column visibility presets.
 * @returns Initial column visibility, or undefined.
 */
export function getInitialPresetVisibility(
  presets: ColumnVisibilityPreset[] | undefined,
): VisibilityState | undefined {
  return presets?.[0]?.columnVisibility;
}

/**
 * Returns true when the preset is on: every column that can be hidden has the visibility the preset gives it (a column
 * the preset doesn't list is visible). Columns that can't be hidden are ignored. An unknown key is false.
 * @param table - Table.
 * @param key - Preset key.
 * @returns True when the preset is on.
 */
export function getIsColumnVisibilityPresetActive<T extends RowData>(
  table: Table<T>,
  key: string,
): boolean {
  const preset = findPreset(table, key);
  if (!preset) return false;
  return matchesPreset(table, preset, getHideableColumnIds(table));
}

/**
 * Returns the preset with the given key.
 * @param table - Table.
 * @param key - Preset key.
 * @returns Preset, or undefined.
 */
function findPreset<T extends RowData>(
  table: Table<T>,
  key: string,
): ColumnVisibilityPreset | undefined {
  return getColumnVisibilityPresets(table).find((preset) => preset.key === key);
}

/**
 * Returns the table's leaf columns that can be hidden: the columns the column visibility menu lists.
 * @param table - Table.
 * @returns Hideable leaf columns.
 */
function getHideableColumns<T extends RowData>(table: Table<T>): Column<T>[] {
  return getCanHideColumns(table.getAllLeafColumns());
}

/**
 * Returns the IDs of the table's leaf columns that can be hidden.
 * @param table - Table.
 * @returns Hideable leaf column IDs.
 */
function getHideableColumnIds<T extends RowData>(table: Table<T>): string[] {
  return getHideableColumns(table).map(({ id }) => id);
}

/**
 * Returns the visibility a preset gives a column; a column the preset doesn't list is visible.
 * @param columnVisibility - Preset column visibility.
 * @param columnId - Column ID.
 * @returns True when the column is visible.
 */
function getPresetVisibility(
  columnVisibility: VisibilityState,
  columnId: string,
): boolean {
  return columnVisibility[columnId] ?? true;
}

/**
 * Returns true when two column visibilities agree on every given column; a column a visibility doesn't list is visible.
 * This is the one matching rule, shared by the active preset check and the duplicate preset check.
 * @param a - Column visibility.
 * @param b - Column visibility.
 * @param columnIds - IDs of the columns to compare.
 * @returns True when both agree on every column.
 */
function isSameVisibility(
  a: VisibilityState,
  b: VisibilityState,
  columnIds: string[],
): boolean {
  return columnIds.every(
    (id) => getPresetVisibility(a, id) === getPresetVisibility(b, id),
  );
}

/**
 * Returns true when the table's visible columns match the preset on the given columns.
 * @param table - Table.
 * @param preset - Preset.
 * @param columnIds - IDs of the columns that can be hidden.
 * @returns True when the preset is on.
 */
function matchesPreset<T extends RowData>(
  table: Table<T>,
  preset: ColumnVisibilityPreset,
  columnIds: string[],
): boolean {
  return isSameVisibility(
    table.getState().columnVisibility,
    preset.columnVisibility,
    columnIds,
  );
}
