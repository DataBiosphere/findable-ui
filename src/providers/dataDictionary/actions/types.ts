import { UpdateColumnFiltersAction } from "./updateColumnFilters/types";

export type DataDictionaryAction = UpdateColumnFiltersAction;

export enum DataDictionaryActionKind {
  UpdateColumnFilters = "UPDATE_COLUMN_FILTERS",
}
