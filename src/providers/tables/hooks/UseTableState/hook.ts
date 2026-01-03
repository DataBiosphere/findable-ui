import { useTables } from "../UseTables/hook";
import { TableKey } from "../../state/tables/types";
import { UseTableState } from "./types";

/**
 * Returns the resolved table state for the given table key.
 *
 * This hook optionally applies revision-based guarding to prevent stale
 * pagination state from leaking across dataset boundaries (e.g. when switching between "projects" and "samples").
 *
 * When a `revisionKey` is provided:
 * - If the current table state belongs to the active revision, it is returned as-is.
 * - If the table state belongs to a previous revision, pagination is reset
 *   while preserving all other table state.
 *
 * When no `revisionKey` is provided, the raw table state is returned without
 * any revision checks.
 *
 * @param tableKey - Table key.
 * @param revisionKey - Revision identifier.
 * @returns The resolved table state, with pagination reset if the revision is stale.
 */
export const useTableState = (
  tableKey: TableKey,
  revisionKey?: string,
): UseTableState => {
  const { state } = useTables();
  const { tables } = state;

  const tableState = tables[tableKey];

  // If no revision key is provided, return the table state directly.
  if (!revisionKey) return { state: tableState };

  // If the table state matches the active revision, it is safe to return unchanged.
  if (state.revision === revisionKey) return { state: tableState };

  // Otherwise, the table state pagination belongs to a previous revision.
  // Reset pagination to ensure the table starts from a clean page index for the current dataset lifecycle.
  return {
    state: {
      ...tableState,
      pagination: { pageIndex: 0, pageSize: tableState.pagination.pageSize },
    },
  };
};
