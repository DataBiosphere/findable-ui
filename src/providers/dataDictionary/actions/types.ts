import { ClearMetaAction } from "./clearMeta/types";
import { SyncStateAndUrlAction } from "./syncStateAndUrl/types";
import { UpdateColumnFiltersAction } from "./updateColumnFilters/types";
import { UpdateStateFromUrlAction } from "./updateStateFromUrl/types";

export type DataDictionaryAction =
  | ClearMetaAction
  | SyncStateAndUrlAction
  | UpdateColumnFiltersAction
  | UpdateStateFromUrlAction;

export enum DataDictionaryActionKind {
  ClearMeta = "CLEAR_META",
  SyncStateAndUrl = "SYNC_STATE_AND_URL",
  UpdateColumnFilters = "UPDATE_COLUMN_FILTERS",
  UpdateStateFromUrl = "UPDATE_STATE_FROM_URL",
}
