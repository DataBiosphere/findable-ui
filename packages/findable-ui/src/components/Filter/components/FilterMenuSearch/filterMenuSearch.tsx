import React from "react";
import { SearchIcon } from "../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { SetSearchTermFn } from "../../common/entities";
import { FilterMenuSearch as Search } from "./filterMenuSearch.styles";

export interface FilterMenuSearchProps {
  searchTerm: string;
  setSearchTerm: SetSearchTermFn;
}

export const FilterMenuSearch = ({
  searchTerm,
  setSearchTerm,
}: FilterMenuSearchProps): JSX.Element => {
  return (
    <Search
      placeholder="Search"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      StartAdornment={SearchIcon}
    />
  );
};
