import { JSX } from "react";
import { SearchIcon } from "../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { SetSearchTermFn } from "../../common/entities";
import { SURFACE_TYPE } from "../surfaces/types";
import { StyledInput as Search } from "./filterMenuSearch.styles";

export interface FilterMenuSearchProps {
  searchTerm: string;
  setSearchTerm: SetSearchTermFn;
  surfaceType: SURFACE_TYPE;
}

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
