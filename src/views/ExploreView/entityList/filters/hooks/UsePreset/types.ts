import { TableState } from "@tanstack/react-table";

/**
 * Return type for the useApplyPreset hook.
 */
export interface UsePreset {
  onPreset: (presetKey: string, tableState: Partial<TableState>) => void;
}
