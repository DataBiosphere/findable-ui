import { ClearMetaAction } from "./clearMeta/types";
import { StateToUrlAction } from "./stateToUrl/types";
import { UpdateColumnFiltersAction } from "./updateColumnFilters/types";
import { UrlToStateAction } from "./urlToState/types";

export type TablesAction =
  | ClearMetaAction
  | StateToUrlAction
  | UpdateColumnFiltersAction
  | UrlToStateAction;

export enum TablesActionKind {
  ClearMeta = "CLEAR_META",
  StateToUrl = "STATE_TO_URL",
  UpdateColumnFilters = "UPDATE_COLUMN_FILTERS",
  UrlToState = "URL_TO_STATE",
}
