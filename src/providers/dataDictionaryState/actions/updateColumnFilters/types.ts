import { ColumnFiltersState, Updater } from "@tanstack/react-table";
import { DataDictionaryActionKind } from "../types";

export type UpdateColumnFiltersAction = {
  payload: UpdateColumnFiltersPayload;
  type: DataDictionaryActionKind.UpdateColumnFilters;
};

/**
 * Payload for the update column filters action.
 */
export interface UpdateColumnFiltersPayload {
  dictionary: string;
  updaterOrValue: Updater<ColumnFiltersState>;
}
