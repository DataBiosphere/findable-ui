import { ColumnFiltersState, Updater } from "@tanstack/react-table";
import { DataDictionaryActionKind } from "../types";

export type UpdateColumnFiltersAction = {
  payload: UpdateColumnFiltersPayload;
  type: DataDictionaryActionKind.UpdateColumnFilters;
};

export interface UpdateColumnFiltersPayload {
  dictionary: string;
  updaterOrValue: Updater<ColumnFiltersState>;
}
