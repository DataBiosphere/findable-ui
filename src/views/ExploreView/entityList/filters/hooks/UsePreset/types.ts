import { TableState } from "@tanstack/react-table";

/**
 * Function that returns the table state for a given preset key.
 */
export type GetPresetTableState = (
  presetKey: string,
) => Partial<TableState> | undefined;

/**
 * Return type for the usePreset hook.
 */
export interface UsePreset {
  onPreset: (presetKey: string) => void;
}
