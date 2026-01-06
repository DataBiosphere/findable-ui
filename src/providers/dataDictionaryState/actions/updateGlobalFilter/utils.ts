import { functionalUpdate } from "@tanstack/react-table";
import { META_COMMAND } from "../../../../hooks/stateSyncManager/hooks/UseMetaCommands/types";
import { DataDictionaryState } from "../../types";
import { UpdateGlobalFilterPayload } from "./types";

/**
 * Builds the next global filter state for the current dictionary.
 * Uses TanStack updater to update the global filter state.
 * @param payload - Payload.
 * @returns global filter state.
 */
export function buildNextGlobalFilter(
  payload: UpdateGlobalFilterPayload,
): string | undefined {
  return functionalUpdate(payload.updaterOrValue, undefined) || undefined;
}

/**
 * Builds the next meta state for the current dictionary.
 * @param state - State.
 * @param payload - Payload.
 * @param nextGlobalFilter - Next global filter.
 * @returns meta state.
 */
export function buildNextMeta(
  state: DataDictionaryState,
  payload: UpdateGlobalFilterPayload,
  nextGlobalFilter: string | undefined,
): DataDictionaryState["meta"] {
  const currentGlobalFilter = getCurrentGlobalFilter(state, payload);
  // Use PUSH method with adding or removing the global filter.
  if (currentGlobalFilter === undefined || nextGlobalFilter === undefined) {
    return { command: META_COMMAND.STATE_TO_URL_PUSH };
  }
  // Use REPLACE method with edits to the global filter.
  return { command: META_COMMAND.STATE_TO_URL_REPLACE };
}

/**
 * Returns the current global filter for the current dictionary.
 * @param state - State.
 * @param payload - Payload.
 * @returns global filter.
 */
function getCurrentGlobalFilter(
  state: DataDictionaryState,
  payload: UpdateGlobalFilterPayload,
): string | undefined {
  return state.dictionaries[payload.dictionary].state.globalFilter;
}
