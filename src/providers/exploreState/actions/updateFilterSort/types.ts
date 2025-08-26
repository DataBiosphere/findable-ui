import { FILTER_SORT } from "../../../../common/filters/sort/config/types";
import { ExploreActionKind } from "../../../exploreState";

export type UpdateFilterSortAction = {
  payload: UpdateFilterSortPayload;
  type: ExploreActionKind.UpdateFilterSort;
};

export type UpdateFilterSortPayload = FILTER_SORT;
