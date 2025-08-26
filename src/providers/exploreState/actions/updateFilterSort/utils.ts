import { isRangeCategory } from "../../../../common/categories/models/range/typeGuards";
import { CategoryView } from "../../../../common/categories/views/types";
import { FILTER_SORT } from "../../../../common/filters/sort/config/types";
import { sortCategoryValueViews } from "../../../../common/filters/sort/models/utils";
import { ExploreState } from "../../../exploreState";

/**
 * Sorts the category views for the current entity type, based on the filter sort.
 * @param state - Explore state.
 * @param filterSort - Filter sort.
 * @returns Sorted category views.
 */
export function sortCategoryViews(
  state: ExploreState,
  filterSort: FILTER_SORT
): CategoryView[] {
  return [...state.categoryViews].map((categoryView) => {
    // Skip range categories.
    if (isRangeCategory(categoryView)) return categoryView;

    // Use structural clone for select categories that need sorting.
    const nextCategoryView = {
      ...categoryView,
      values: [...categoryView.values],
    };

    sortCategoryValueViews(nextCategoryView.values, filterSort);
    return nextCategoryView;
  });
}
