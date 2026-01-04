import { CategoryKey, CategoryValueKey } from "../../../entities";
import { VIEW_KIND } from "../../../categories/views/types";

export type OnFilterChange = (
  categoryKey: CategoryKey,
  selectedCategoryValue: CategoryValueKey,
  viewKind?: VIEW_KIND,
) => void;

export type OnFilterReset = () => void;

export interface UseTableFilters {
  onFilterChange: OnFilterChange;
  onFilterReset: OnFilterReset;
}
