import { AutocompleteProps } from "@mui/material";
import { CategoryView } from "../../../../common/categories/views/types";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { BaseComponentProps } from "../../../types";
import { SURFACE_TYPE } from "../surfaces/types";

export interface SearchAllFiltersProps
  extends Omit<
      AutocompleteProps<string, false, false, true>,
      "options" | "renderInput"
    >,
    BaseComponentProps {
  categoryViews: CategoryView[];
  onFilter: OnFilterFn;
  surfaceType?: SURFACE_TYPE;
}
