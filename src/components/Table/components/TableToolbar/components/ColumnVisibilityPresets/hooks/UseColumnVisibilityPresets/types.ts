import type { ToggleButtonGroupProps } from "@mui/material";

/**
 * A preset's toggle button: unavailable, with a tooltip saying why, while the preset would hide a grouped column.
 */
export interface PresetButton {
  disabled: boolean;
  key: string;
  label: string;
  tooltip: string;
}

/**
 * The preset toggle's buttons, selected value and change handler.
 */
export interface UseColumnVisibilityPresets {
  onChange: NonNullable<ToggleButtonGroupProps["onChange"]>;
  presets: PresetButton[];
  value: string | null;
}
