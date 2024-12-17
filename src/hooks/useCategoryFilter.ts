import { COLLATOR_CASE_INSENSITIVE } from "../common/constants";
import {
  CategoryKey,
  Filters,
  SelectCategory,
  SelectCategoryValue,
  SelectCategoryValueView,
  SelectCategoryView,
  SelectedFilter,
} from "../common/entities";
import { CategoryConfig } from "../config/entities";

/**
 * State backing filter functionality and calculations. Converted to view model for display.
 */
export type FilterState = Filters;

/**
 * Shape of return value from this useCategoryFilter hook.
 */
export interface FilterInstance {
  categories: SelectCategoryView[];
  filter: FilterState;
  onFilter: OnFilterFn;
}

/**
 * Function invoked when selected state of a category value is toggled or range is selected.
 */
export type OnFilterFn = (
  categoryKey: CategoryKey,
  selectedCategoryValue: unknown,
  selected: boolean,
  categorySection?: string,
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
 * Build the view-specific model of the given category, including the category label pulled from the config.
 * @param category - The category to build a view model of.
 * @param categoryValueViews - Set of category value view models for the given category.
 * @param categoryConfigs - Category configs indicating accept list as well as label configuration.
 * @returns Full built category value view, ready for display.
 */
function buildCategoryView(
  category: SelectCategory,
  categoryValueViews: SelectCategoryValueView[],
  categoryConfigs: CategoryConfig[]
): SelectCategoryView {
  const categoryConfig = findCategoryConfig(category.key, categoryConfigs);
  const mapSelectCategoryValue =
    categoryConfig?.mapSelectCategoryValue || getSelectCategoryValue;
  return {
    isDisabled: false,
    key: category.key,
    label: getCategoryLabel(category.key, categoryConfig),
    values: categoryValueViews.map(mapSelectCategoryValue),
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
  categories: SelectCategory[],
  categoryConfigs: CategoryConfig[] | undefined,
  filterState: FilterState
): SelectCategoryView[] {
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

    // Build view models for each category value in this category and sort alpha.
    const categoryValueViews = category.values.map((categoryValue) =>
      buildCategoryValueView(categoryValue, categorySelectedFilter)
    );
    categoryValueViews.sort(sortCategoryValueViews);

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
 * @returns New filter state generated from the current set of selected values and the newly selected value.
 */
export function buildNextFilterState(
  filterState: FilterState,
  categoryKey: CategoryKey,
  selectedValue: unknown,
  selected: boolean
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

  // Handle case where category value is selected.
  if (selected) {
    nextCategorySelectedFilter.value.push(selectedValue);
  }
  // Otherwise, category value has been de-selected; remove the selected value from the selected set of values.
  else {
    nextCategorySelectedFilter.value = nextCategorySelectedFilter.value.filter(
      (value: unknown) => value !== selectedValue
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
 * Returns the category config for the given category config key.
 * @param key - Category config key.
 * @param categoryConfigs - Category configs.
 * @returns category config.
 */
function findCategoryConfig(
  key: string,
  categoryConfigs: CategoryConfig[]
): CategoryConfig | undefined {
  return categoryConfigs.find((categoryConfig) => categoryConfig.key === key);
}

/**
 * Determine if given category value is selected.
 * @param categoryValueKey - The key of the category value to check if selected in the filter state.
 * @param categorySelectedFilter - Current filter state for a category.
 * @returns True if category value is in the set of currently selected values.
 */
function isCategoryValueSelected(
  categoryValueKey: unknown,
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
  category: SelectCategory,
  categoryConfigs: CategoryConfig[]
): boolean {
  return categoryConfigs.some(
    (categoryConfig) => categoryConfig.key === category.key
  );
}

/**
 * Sort category value views by key, ascending.
 * @param cvv0 - First category value view to compare.
 * @param cvv1 - Second category value view to compare.
 * @returns Number indicating sort precedence of cv0 vs cv1.
 */
function sortCategoryValueViews(
  cvv0: SelectCategoryValueView,
  cvv1: SelectCategoryValueView
): number {
  return COLLATOR_CASE_INSENSITIVE.compare(cvv0.label, cvv1.label);
}

/**
 * Sort category views by display label, ascending.
 * @param c0 - First category view to compare.
 * @param c1 - Second category view to compare.
 * @returns Number indicating sort precedence of c0 vs c1.
 */
function sortCategoryViews(
  c0: SelectCategoryView,
  c1: SelectCategoryView
): number {
  return COLLATOR_CASE_INSENSITIVE.compare(c0.label, c1.label);
}
