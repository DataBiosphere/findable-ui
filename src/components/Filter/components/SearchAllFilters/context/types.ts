import { SelectCategoryView } from "../../../../../common/entities";
import { OnFilterFn } from "../../../../../hooks/useCategoryFilter";
import { SURFACE_TYPE } from "../../surfaces/types";

export interface AutocompleteContextProps {
  onClear: () => void;
  onFilter: OnFilterFn;
  open: boolean;
  searchTerm: string;
  selectCategoryViews: SelectCategoryView[];
  surfaceType: SURFACE_TYPE;
}
