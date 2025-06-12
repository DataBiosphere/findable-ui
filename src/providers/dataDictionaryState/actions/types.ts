import { ClearMetaAction } from "./clearMeta/types";
import { StateToUrlAction } from "./stateToUrl/types";
import { UpdateColumnFiltersAction } from "./updateColumnFilters/types";
import { UpdateGlobalFilterAction } from "./updateGlobalFilter/types";
import { UrlToStateAction } from "./urlToState/types";

export type DataDictionaryAction =
  | ClearMetaAction
  | StateToUrlAction
  | UpdateColumnFiltersAction
  | UpdateGlobalFilterAction
  | UrlToStateAction;

export enum DataDictionaryActionKind {
  ClearMeta = "CLEAR_META",
  StateToUrl = "STATE_TO_URL",
  UpdateColumnFilters = "UPDATE_COLUMN_FILTERS",
  UpdateGlobalFilter = "UPDATE_GLOBAL_FILTER",
  UrlToState = "URL_TO_STATE",
}
