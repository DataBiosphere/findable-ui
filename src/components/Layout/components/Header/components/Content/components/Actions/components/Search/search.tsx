import React, { useState } from "react";
import SearchBar from "./components/SearchBar/searchBar";
import { SearchButton } from "./components/SearchButton/searchButton";

export interface SearchProps {
  closeMenu: () => void;
  searchEnabled?: boolean;
  searchURL?: string;
}

export const Search = ({
  closeMenu,
  searchEnabled,
  searchURL,
}: SearchProps): JSX.Element => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  return (
    <>
      {searchEnabled && (
        <SearchButton openSearch={(): void => setSearchOpen(true)} />
      )}
      <SearchBar
        closeMenu={closeMenu}
        closeSearch={(): void => setSearchOpen(false)}
        searchOpen={searchOpen}
        searchURL={searchURL}
      />
    </>
  );
};
