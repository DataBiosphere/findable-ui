import { OnFilterFn } from "../../../../../hooks/useCategoryFilter";
import { SURFACE_TYPE } from "../../surfaces/types";
import type { SearchAllFiltersItem } from "../common/entities";

/**
 * Search all filters autocomplete context.
 */
export interface AutocompleteContextProps {
  filteredItems: SearchAllFiltersItem[];
  highlightedIndex: number;
  onClear: () => void;
  onFilter: OnFilterFn;
  open: boolean;
  optionIdPrefix: string;
  searchTerm: string;
  surfaceType: SURFACE_TYPE;
}
