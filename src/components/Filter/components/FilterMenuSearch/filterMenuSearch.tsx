import { JSX } from "react";
import { SearchIcon } from "../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { SetSearchTermFn } from "../../common/entities";
import { SURFACE_TYPE } from "../surfaces/types";
import { StyledInput as Search } from "./filterMenuSearch.styles";

/**
 * Props for the FilterMenuSearch component.
 */
export interface FilterMenuSearchProps {
  searchTerm: string;
  setSearchTerm: SetSearchTermFn;
  surfaceType: SURFACE_TYPE;
}

/**
 * Search input for the filter menu's values, with a search icon.
 * @param props - Component props.
 * @param props.searchTerm - Search term.
 * @param props.setSearchTerm - Function invoked to set the search term.
 * @param props.surfaceType - Filter surface type.
 * @returns The filter menu search.
 */
export const FilterMenuSearch = ({
  searchTerm,
  setSearchTerm,
  surfaceType,
}: FilterMenuSearchProps): JSX.Element => {
  return (
    <Search
      placeholder="Search"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      StartAdornment={SearchIcon}
      surfaceType={surfaceType}
    />
  );
};
