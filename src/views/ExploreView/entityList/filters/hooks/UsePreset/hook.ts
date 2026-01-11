import { Table, TableState } from "@tanstack/react-table";
import { useCallback } from "react";
import { useEntityViewDispatch } from "../../../../state/hooks/useEntityViewDispatch/hook";
import { UsePreset } from "./types";

/**
 * Hook to apply presets to a table.
 * Sets column filters, sorting, and other table state and tracks the active preset.
 *
 * @param table - TanStack Table instance.
 * @param entityListType - Entity identifier for preset state management.
 * @returns Object containing applyPreset function.
 */
export const usePreset = <T = unknown>(
  table: Table<T>,
  entityListType: string,
): UsePreset => {
  const { onSetPreset } = useEntityViewDispatch(entityListType);

  const onPreset = useCallback(
    (presetKey: string, tableState: Partial<TableState>) => {
      // Set table state.
      table.setState((old) => ({ ...old, ...tableState }));

      // Track the preset
      onSetPreset(presetKey);
    },
    [onSetPreset, table],
  );

  return { onPreset };
};
