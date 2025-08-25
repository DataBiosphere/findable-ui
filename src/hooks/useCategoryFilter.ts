import { CategoryConfig } from "../common/categories/config/types";
import { findSelectCategoryConfig } from "../common/categories/config/utils";
import { isRangeCategory } from "../common/categories/models/range/typeGuards";
import { buildNextRangeFilterState } from "../common/categories/models/range/utils";
import { buildNextSelectFilterState } from "../common/categories/models/select/utils";
import { Category } from "../common/categories/models/types";
import { buildRangeCategoryView } from "../common/categories/views/range/utils";
import { CategoryView, VIEW_KIND } from "../common/categories/views/types";
import { COLLATOR_CASE_INSENSITIVE } from "../common/constants";
import {
  CategoryKey,
  CategoryValueKey,
  ClearAll,
  Filters,
  SelectCategory,
  SelectCategoryValue,
  SelectCategoryValueView,
  SelectCategoryView,
  SelectedFilter,
} from "../common/entities";
import { sortCategoryValueViewsAlpha } from "../common/filters/sort/models/utils";

/**
 * State backing filter functionality and calculations. Converted to view model for display.
 */
export type FilterState = Filters;

/**
 * Function invoked when selected state of a category value is toggled or range is selected.
 */
export type OnFilterFn = (
  categoryKey: CategoryKey | ClearAll,
  selectedCategoryValue: CategoryValueKey,
  selected: boolean,
  categorySection?: string,
  viewKind?: VIEW_KIND,
  searchTerm?: string
) => void;

/**
 * Build the view-specific model of the given category value.
 * @param categoryValue - The category value to build a view model of.
 * @param categorySelectedFilter - Current filter state for a category.
 * @returns Full built category value view, ready for display.
 */
function buildCategoryValueView(
  categoryValue: SelectCategoryValue,
  categorySelectedFilter?: SelectedFilter
): SelectCategoryValueView {
  // Determine if the category value is currently selected.
  const selected = isCategoryValueSelected(
    categoryValue.key,
    categorySelectedFilter
  );

  // Build view model.
  return {
    count: categoryValue.count,
    key: categoryValue.key,
    label: categoryValue.label,
    selected,
  };
}

/**
 * Build the view-specific model of the given select category, including the category label pulled from the config.
 * @param selectCategory - The select category to build a view model of.
 * @param selectCategoryValueViews - Set of select category value view models for the given category.
 * @param categoryConfigs - Category configs indicating accept list as well as label configuration.
 * @returns Full built select category view, ready for display.
 */
function buildCategoryView(
  selectCategory: SelectCategory,
  selectCategoryValueViews: SelectCategoryValueView[],
  categoryConfigs: CategoryConfig[]
): SelectCategoryView {
  const selectCategoryConfig = findSelectCategoryConfig(
    selectCategory.key,
    categoryConfigs
  );
  const mapSelectCategoryValue =
    selectCategoryConfig?.mapSelectCategoryValue || getSelectCategoryValue;
  return {
    annotation: selectCategoryConfig?.annotation,
    enableChartView: selectCategoryConfig?.enableChartView,
    isDisabled: false,
    key: selectCategory.key,
    label: getCategoryLabel(selectCategory.key, selectCategoryConfig),
    values: selectCategoryValueViews.map(mapSelectCategoryValue),
  };
}

/**
 * Build view-specific models from filter state, to facilitate easy rendering.
 * @param categories - Categories, category value and their counts with the current filter applied.
 * @param categoryConfigs - Category configs indicating accept list as well as label configuration.
 * @param filterState - Current set of selected category and category values.
 * @returns Array of category view objects.
 */
export function buildCategoryViews(
  categories: Category[],
  categoryConfigs: CategoryConfig[] | undefined,
  filterState: FilterState
): CategoryView[] {
  if (!categories || !categoryConfigs) {
    return [];
  }

  // Determine the set of categories to display.
  const acceptListCategories = categories.filter((category) =>
    isCategoryAcceptListed(category, categoryConfigs)
  );

  // Build view models for each category.
  const views = acceptListCategories.map((category) => {
    // Get the set of selected values for this category, if any.
    const categorySelectedFilter = getCategorySelectedFilter(
      category.key,
      filterState
    );

    // Build view model for range categories.
    if (isRangeCategory(category)) {
      return buildRangeCategoryView(
        category,
        categoryConfigs,
        categorySelectedFilter
      );
    }

    // Build view model for single or multiselect categories.
    const categoryValueViews = category.values.map((categoryValue) =>
      buildCategoryValueView(categoryValue, categorySelectedFilter)
    );

    // Sort category value views alphabetically.
    categoryValueViews.sort(sortCategoryValueViewsAlpha);

    // Build category view model.
    return buildCategoryView(category, categoryValueViews, categoryConfigs);
  });

  // Sort and return category views.
  views.sort(sortCategoryViews);
  return views;
}

/**
 * Build new set of selected filters on de/select of filter.
 * @param filterState - Current set of selected category and category values.
 * @param categoryKey - Key of category that has been de/selected.
 * @param selectedValue - Key of category value that has been de/selected
 * @param selected - True if value is selected, false if de-selected.
 * @param viewKind - View kind.
 * @returns New filter state generated from the current set of selected values and the newly selected value.
 */
export function buildNextFilterState(
  filterState: FilterState,
  categoryKey: CategoryKey,
  selectedValue: CategoryValueKey,
  selected: boolean,
  viewKind?: VIEW_KIND
): FilterState {
  // Check if the selected category already has selected values.
  const categorySelectedFilter = getCategorySelectedFilter(
    categoryKey,
    filterState
  );

  // Create a copy of the current filter state. Remove the selected filter for the selected category, if any.
  const nextFilterState = filterState.filter(
    (selectedFilter: SelectedFilter) =>
      selectedFilter !== categorySelectedFilter
  );

  // Create new selected filter for this category. Copy values currently selected for this category, if any.
  const nextCategorySelectedFilter = {
    categoryKey,
    value: categorySelectedFilter ? [...categorySelectedFilter.value] : [],
  };

  // Build next filter state for category.
  if (viewKind === VIEW_KIND.RANGE) {
    // Handle range category.
    buildNextRangeFilterState(
      nextCategorySelectedFilter,
      selectedValue,
      selected
    );
  } else {
    // Handle select category.
    buildNextSelectFilterState(
      nextCategorySelectedFilter,
      selectedValue,
      selected
    );
  }

  // Add the new selected filter for this category to the set of selected filters, if there are selected values for it.
  if (nextCategorySelectedFilter.value.length) {
    nextFilterState.push(nextCategorySelectedFilter);
  }

  return nextFilterState;
}

/**
 * Get the selected values for the given category, if any.
 * @param categoryKey - Key of category to check if it has any selected category values.
 * @param filterState - Current set of selected category and category values.
 * @returns The selected filter (i.e. the set of selected values) for the given category.
 */
function getCategorySelectedFilter(
  categoryKey: CategoryKey,
  filterState: FilterState
): SelectedFilter | undefined {
  return filterState.find((filter) => filter.categoryKey === categoryKey);
}

/**
 * Get the label for the given category key as per the config.
 * @param key - Key of category to find label of.
 * @param categoryConfig - Category.
 * @returns the display value for the given category.
 */
function getCategoryLabel(
  key: string,
  categoryConfig?: CategoryConfig
): string {
  if (!categoryConfig) {
    return key;
  }
  return categoryConfig.label;
}

/**
 * Default function returning select category value, unmodified.
 * @param selectCategoryValue - Select category value.
 * @returns original select category value.
 */
export function getSelectCategoryValue(
  selectCategoryValue: SelectCategoryValue
): SelectCategoryValue {
  return selectCategoryValue;
}

/**
 * Determine if given category value is selected.
 * @param categoryValueKey - The key of the category value to check if selected in the filter state.
 * @param categorySelectedFilter - Current filter state for a category.
 * @returns True if category value is in the set of currently selected values.
 */
function isCategoryValueSelected(
  categoryValueKey: CategoryValueKey,
  categorySelectedFilter?: SelectedFilter
): boolean {
  if (!categorySelectedFilter) {
    return false;
  }
  return categorySelectedFilter.value.includes(categoryValueKey);
}

/**
 * Determine if category is to be included in filter.
 * @param category - Category to check if included in accept list.
 * @param categoryConfigs - Category accept list.
 * @returns true if category is to be included in filter.
 */
function isCategoryAcceptListed(
  category: Category,
  categoryConfigs: CategoryConfig[]
): boolean {
  return categoryConfigs.some(
    (categoryConfig) => categoryConfig.key === category.key
  );
}

/**
 * Sort category views by display label, ascending.
 * @param c0 - First category view to compare.
 * @param c1 - Second category view to compare.
 * @returns Number indicating sort precedence of c0 vs c1.
 */
function sortCategoryViews(c0: CategoryView, c1: CategoryView): number {
  return COLLATOR_CASE_INSENSITIVE.compare(c0.label, c1.label);
}
