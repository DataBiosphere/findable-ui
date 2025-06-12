import { functionalUpdate } from "@tanstack/react-table";
import { UpdateGlobalFilterPayload } from "./types";

/**
 * Builds the next global filter state for the current dictionary.
 * Uses TanStack updater to update the global filter state.
 * @param payload - Payload.
 * @returns global filter state.
 */
export function buildNextGlobalFilter(
  payload: UpdateGlobalFilterPayload
): string {
  return functionalUpdate(payload.updaterOrValue, "");
}
