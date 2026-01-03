import { ClearMetaAction } from "./clearMeta/types";
import { StateToUrlAction } from "./stateToUrl/types";
import { UpdateColumnFiltersAction } from "./updateColumnFilters/types";
import { UpdatePaginationAction } from "./updatePagination/types";
import { UrlToStateAction } from "./urlToState/types";

export type TablesAction =
  | ClearMetaAction
  | StateToUrlAction
  | UpdateColumnFiltersAction
  | UpdatePaginationAction
  | UrlToStateAction;

export enum TablesActionKind {
  ClearMeta = "CLEAR_META",
  StateToUrl = "STATE_TO_URL",
  UpdateColumnFilters = "UPDATE_COLUMN_FILTERS",
  UpdatePagination = "UPDATE_PAGINATION",
  UrlToState = "URL_TO_STATE",
}
