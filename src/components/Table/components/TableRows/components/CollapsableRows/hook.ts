import { RowData, Table } from "@tanstack/react-table";
import { useEffect } from "react";

/**
 * Hook to manage the expanded row state during viewport transitions (e.g., desktop to mobile and vice versa).
 * Designed for use with the `CollapsableRows` component, where row expansion is a work in progress for desktop viewports.
 * This hook ensures that all rows are collapsed when transitioning from desktop to mobile (when `CollapsableRows` component is mounted).
 * It also resets the expanded row state when transitioning back to desktop (when the `CollapsableRows` component is unmounted).
 * @param table - Table.
 */
export function useCollapsableRows<T extends RowData>(table: Table<T>): void {
  const { resetExpanded, toggleAllRowsExpanded } = table;

  useEffect(() => {
    toggleAllRowsExpanded(false);
    return (): void => {
      resetExpanded();
    };
  }, [resetExpanded, toggleAllRowsExpanded]);
}
