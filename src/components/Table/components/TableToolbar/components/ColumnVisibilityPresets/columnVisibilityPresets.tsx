import { ToggleButton, Tooltip } from "@mui/material";
import type { RowData } from "@tanstack/react-table";
import type { JSX } from "react";
import { StyledToggleButtonGroup } from "./columnVisibilityPresets.styles";
import { TOGGLE_BUTTON_GROUP_PROPS } from "./constants";
import { useColumnVisibilityPresets } from "./hooks/UseColumnVisibilityPresets/hook";
import type { ColumnVisibilityPresetsProps } from "./types";

/**
 * Column visibility preset toggle: one button per preset, with the preset whose columns match the visible columns
 * selected. Choosing a preset shows its columns. A preset that would hide a grouped column is unavailable
 * (aria-disabled, so it stays focusable), with a tooltip naming the columns to ungroup.
 * @param props - Component props.
 * @param props.className - Class name, for styled() overrides.
 * @param props.tableInstance - TanStack table instance.
 * @returns The preset toggle, or null when the table has no presets or its hiding is not enabled.
 */
export const ColumnVisibilityPresets = <T extends RowData>({
  className,
  tableInstance,
}: ColumnVisibilityPresetsProps<T>): JSX.Element | null => {
  const { onChange, presets, value } =
    useColumnVisibilityPresets(tableInstance);
  if (!tableInstance.options.enableHiding || !presets.length) return null;
  return (
    <StyledToggleButtonGroup
      {...TOGGLE_BUTTON_GROUP_PROPS}
      className={className}
      onChange={onChange}
      value={value}
    >
      {presets.map(({ disabled, key, label, tooltip }) => (
        <Tooltip key={key} describeChild title={tooltip}>
          <ToggleButton aria-disabled={disabled || undefined} value={key}>
            {label}
          </ToggleButton>
        </Tooltip>
      ))}
    </StyledToggleButtonGroup>
  );
};
