import { CategoryValueKey, SelectedFilter } from "../../../entities";

/**
 * Build the next filter state for the given select category.
 * @param nextCategorySelectedFilter - Next filter state for the select category.
 * @param selectedValue - Selected value for the select category.
 * @param selected - Whether the category value is selected.
 */
export function buildNextSelectFilterState(
  nextCategorySelectedFilter: SelectedFilter,
  selectedValue: CategoryValueKey,
  selected: boolean
): void {
  if (selected) {
    // Set the selected value.
    nextCategorySelectedFilter.value.push(selectedValue);
  } else {
    // Remove the selected value from the selected set of values.
    nextCategorySelectedFilter.value = nextCategorySelectedFilter.value.filter(
      (value: CategoryValueKey) => value !== selectedValue
    );
  }
}
