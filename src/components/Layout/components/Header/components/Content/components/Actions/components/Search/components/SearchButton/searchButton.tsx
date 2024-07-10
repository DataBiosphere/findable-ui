import { IconButton } from "@mui/material";
import React from "react";
import { useBreakpoint } from "../../../../../../../../../../../../hooks/useBreakpoint";
import { SearchIcon } from "../../../../../../../../../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { Button } from "./searchButton.styles";

export interface SearchProps {
  openSearch: () => void;
}

export const SearchButton = ({ openSearch }: SearchProps): JSX.Element => {
  const { mdUp } = useBreakpoint();
  return mdUp ? (
    <Button onClick={openSearch} startIcon={<SearchIcon />} variant="nav">
      Search
    </Button>
  ) : (
    <IconButton color="ink" onClick={openSearch}>
      <SearchIcon fontSize="medium" />
    </IconButton>
  );
};
