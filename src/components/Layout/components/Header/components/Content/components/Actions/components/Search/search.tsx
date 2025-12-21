import {
  ButtonProps as MButtonProps,
  IconButton as MIconButton,
  IconButtonProps as MIconButtonProps,
} from "@mui/material";
import { JSX, ElementType, useState } from "react";
import { SearchIcon } from "../../../../../../../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { StyledButton } from "./components/Button/button.styles";
import SearchBar from "./components/SearchBar/searchBar";

export interface SearchProps {
  Button: ElementType<MButtonProps> | ElementType<MIconButtonProps>;
  closeMenu: () => void;
  searchEnabled?: boolean;
  searchURL?: string;
}

export const Search = ({
  Button,
  closeMenu,
  searchEnabled,
  searchURL,
}: SearchProps): JSX.Element | null => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  if (!searchEnabled) return null;

  return (
    <>
      <Button onClick={(): void => setSearchOpen(true)} />
      <SearchBar
        closeMenu={closeMenu}
        closeSearch={(): void => setSearchOpen(false)}
        searchOpen={searchOpen}
        searchURL={searchURL}
      />
    </>
  );
};

/**
 * Renders search button.
 * @param props - Button props.
 * @returns button.
 */
export function renderButton(props: MButtonProps): JSX.Element {
  return (
    <StyledButton startIcon={<SearchIcon />} variant="nav" {...props}>
      Search
    </StyledButton>
  );
}

/**
 * Renders search icon button.
 * @param props - Button props.
 * @returns icon button.
 */
export function renderIconButton(props: MIconButtonProps): JSX.Element {
  return (
    <MIconButton color="ink" {...props}>
      <SearchIcon fontSize="medium" />
    </MIconButton>
  );
}
