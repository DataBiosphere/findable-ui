import type { FilterSortCompare } from "../../../../common/filters/sort/config/types";
import { ExploreState } from "../../../exploreState";
import { updateEntityStateByCategoryGroupConfigKey } from "../../utils";
import { UpdateFilterSortPayload } from "./types";
import { sortCategoryViews } from "./utils";

/**
 * Reducer function to handle the "update filter sort" action.
 * Updates the filter sort in the state for the current entity.
 * @param state - Explore State.
 * @param payload - Payload.
 * @param compare - Optional comparator from the site config, used in place of the built-in comparator for the filter sort.
 * @returns explore state.
 */
export function updateFilterSortAction(
  state: ExploreState,
  payload: UpdateFilterSortPayload,
  compare?: FilterSortCompare,
): ExploreState {
  const filterSort = payload;

  // Sort the category views based on the new filter sort.
  const categoryViews = sortCategoryViews(state, filterSort, compare);

  // Update entity state by category group config key
  updateEntityStateByCategoryGroupConfigKey(state, { categoryViews });

  return {
    ...state,
    categoryViews,
    filterSort,
  };
}
