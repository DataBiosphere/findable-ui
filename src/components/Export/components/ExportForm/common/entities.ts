import { CategoryKey, CategoryValueKey } from "../../../../../common/entities";

/**
 * Function invoked to update file manifest filters when selected state of a category value is toggled.
 */
export type OnFilterFn = (
  categoryKey: CategoryKey,
  selectedCategoryValue: CategoryValueKey,
  selected: boolean,
) => void;

// Function invoked to update file manifest filters when selected state of a category is toggled.
export type OnUpdateFilterFacet = (categoryKey: CategoryKey) => void;
