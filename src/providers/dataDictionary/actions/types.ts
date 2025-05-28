import { ClearMetaAction } from "./clearMeta/types";
import { SyncStateAndUrlAction } from "./syncStateAndUrl/types";
import { UpdateColumnFiltersAction } from "./updateColumnFilters/types";

export type DataDictionaryAction =
  | ClearMetaAction
  | SyncStateAndUrlAction
  | UpdateColumnFiltersAction;

export enum DataDictionaryActionKind {
  ClearMeta = "CLEAR_META",
  SyncStateAndUrl = "SYNC_STATE_AND_URL",
  UpdateColumnFilters = "UPDATE_COLUMN_FILTERS",
}
