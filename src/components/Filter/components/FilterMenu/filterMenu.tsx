import { JSX, useState } from "react";
import {
  CategoryKey,
  SelectCategoryValueView,
} from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { MAX_DISPLAYABLE_LIST_ITEMS } from "../../common/constants";
import { FilterMenuSearchMatch } from "../../common/entities";
import { getSortMatchesFn } from "../../common/utils";
import { StyledList } from "../FilterList/filterList.styles";
import { FilterMenuSearch } from "../FilterMenuSearch/filterMenuSearch";
import { FilterNoResultsFound } from "../FilterNoResultsFound/filterNoResultsFound";
import { ButtonBase } from "../surfaces/drawer/components/ButtonBase/buttonBase";
import { SURFACE_TYPE } from "../surfaces/types";
import { VariableSizeList } from "../VariableSizeList/VariableSizeList";
import { FilterView, FilterViewTools } from "./filterMenu.styles";

/**
 * Props for the FilterMenu component.
 */
export interface FilterMenuProps {
  categoryKey: CategoryKey;
  categoryLabel: string;
  categorySection?: string;
  menuWidth?: number;
  onCloseFilter: () => void;
  onFilter: OnFilterFn;
  surfaceType: SURFACE_TYPE;
  values: SelectCategoryValueView[];
}

/**
 * Filter menu of a category's values, with a search when in the drawer or when there are more values than the menu displays at once.
 * Shows a no results message, with a clear search button, when no value matches the search or the category has no values.
 * In the drawer, a button labelled with the category closes the filter panel.
 * @param props - Component props.
 * @param props.categoryKey - Category key.
 * @param props.categoryLabel - Category label, shown in the drawer.
 * @param props.categorySection - Category section label, passed to onFilter.
 * @param props.menuWidth - Menu width in pixels; defaults to 312.
 * @param props.onCloseFilter - Function invoked by the drawer's category button to close the filter panel.
 * @param props.onFilter - Function invoked when a value is toggled.
 * @param props.surfaceType - Filter surface type.
 * @param props.values - Category values.
 * @returns The filter menu.
 */
export const FilterMenu = ({
  categoryKey,
  categoryLabel,
  categorySection,
  menuWidth = 312,
  onCloseFilter,
  onFilter,
  surfaceType,
  values,
}: FilterMenuProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const isSearchable =
    surfaceType === SURFACE_TYPE.DRAWER ||
    values.length > MAX_DISPLAYABLE_LIST_ITEMS;
  const matchedItems = applyMenuFilter(values, isSearchable ? searchTerm : "");
  return (
    <FilterView menuWidth={menuWidth}>
      <FilterViewTools surfaceType={surfaceType}>
        {surfaceType === SURFACE_TYPE.DRAWER && (
          <ButtonBase onClick={onCloseFilter}>{categoryLabel}</ButtonBase>
        )}
        {isSearchable && (
          <FilterMenuSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            surfaceType={surfaceType}
          />
        )}
      </FilterViewTools>
      {matchedItems.length > 0 ? (
        <VariableSizeList
          categorySection={categorySection}
          categoryKey={categoryKey}
          onFilter={onFilter}
          matchedItems={matchedItems}
          surfaceType={surfaceType}
        />
      ) : (
        <StyledList>
          <FilterNoResultsFound
            onClearSearchTerm={(): void => setSearchTerm("")}
          />
        </StyledList>
      )}
    </FilterView>
  );
};

/**
 * Filters the category values to those whose label, or else key, matches every word of the search term, best matches first, with their matched label ranges when the label matched. An empty search term matches all values.
 * @param values - Category values.
 * @param searchTerm - Search term.
 * @returns The matching values.
 */
export function applyMenuFilter(
  values: SelectCategoryValueView[],
  searchTerm: string,
): FilterMenuSearchMatch[] {
  return getSortMatchesFn(searchTerm)(values);
}
