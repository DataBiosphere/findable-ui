import { TableState } from "@tanstack/react-table";

/**
 * Preset definition representing a curated table state.
 */
export interface PresetDefinition {
  key: string;
  label: string;
  tableState: Partial<TableState>;
}
