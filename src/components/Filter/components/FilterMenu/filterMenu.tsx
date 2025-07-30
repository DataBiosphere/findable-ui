import React, { useState } from "react";
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

export function applyMenuFilter(
  values: SelectCategoryValueView[],
  searchTerm: string
): FilterMenuSearchMatch[] {
  return getSortMatchesFn(searchTerm)(values);
}
