import { Table } from "@tanstack/react-table";
import { useCallback } from "react";
import { useEntityViewDispatch } from "../../../../state/hooks/useEntityViewDispatch/hook";
import { GetPresetTableState, UsePreset } from "./types";

/**
 * Hook to apply presets to a table.
 * Uses provided function to get table state by preset key and applies it.
 * @param table - TanStack Table instance.
 * @param entityListType - Entity identifier for preset state management.
 * @param getPresetTableState - Function to get table state for a preset key.
 * @returns Object containing onPreset function.
 */
export const usePreset = <T = unknown>(
  table: Table<T>,
  entityListType: string,
  getPresetTableState?: GetPresetTableState,
): UsePreset => {
  const { onSetPreset } = useEntityViewDispatch(entityListType);

  const onPreset = useCallback(
    (presetKey: string) => {
      const tableState = getPresetTableState?.(presetKey);

      if (!tableState) {
        console.warn(`Preset ${presetKey} not found.`);
        return;
      }

      // Set table state.
      table.setState((old) => ({ ...old, ...tableState }));

      // Track the preset.
      onSetPreset(presetKey);
    },
    [getPresetTableState, onSetPreset, table],
  );

  return { onPreset };
};
