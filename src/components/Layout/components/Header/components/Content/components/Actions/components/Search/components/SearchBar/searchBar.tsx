import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { ButtonPrimary } from "../../../../../../../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { SearchIcon } from "../../../../../../../../../../../common/CustomIcon/components/SearchIcon/searchIcon";
import {
  ClearButton,
  SearchBar as SearchDialog,
  SearchForm,
  SearchInput,
} from "./searchBar.styles";

interface Props {
  closeMenu: () => void;
  closeSearch: () => void;
  searchOpen: boolean;
  searchURL?: string;
}

export default function SearchBar({
  closeMenu,
  closeSearch,
  searchOpen,
  searchURL,
}: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  /**
   * Clears search term and refocuses input.
   */
  const handleClear = (): void => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  /**
   * Callback fired when the search term is changed.
   * Sets state searchTerm with new search term.
   * @param event - Change event on input element.
   */
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  /**
   * Callback fired after the "exited" transition is applied.
   * Clears search term when search modal closes.
   */
  const handleExited = (): void => {
    setSearchTerm("");
  };

  /**
   * Callback fired when form is submitted.
   * @param formEvent - Form event when form is submitted.
   * @param searchStr - Current search string.
   * @param url - Current configured search path.
   */
  const handleSubmit = (
    formEvent: FormEvent<HTMLFormElement>,
    searchStr: string,
    url?: string
  ): void => {
    formEvent.preventDefault();
    if (searchStr && url) {
      closeMenu();
      closeSearch();
      // Build search URL and redirect to it.
      const location = new URL(url);
      location.searchParams.set("q", searchStr);
      window.location.href = location.href;
    }
  };

  return (
    <SearchDialog
      fullWidth
      hideBackdrop
      maxWidth={false}
      onClose={closeSearch}
      open={searchOpen}
      PaperProps={{ variant: "searchbar" }}
      TransitionProps={{ onExited: handleExited }}
    >
      <SearchForm
        onSubmit={(e: FormEvent<HTMLFormElement>): void =>
          handleSubmit(e, searchTerm, searchURL)
        }
      >
        <SearchIcon fontSize="small" />
        <SearchInput
          autoFocus
          disableUnderline
          endAdornment={
            searchTerm ? (
              <ClearButton
                edge="end"
                Icon={CloseRoundedIcon}
                onClick={handleClear}
                size="small"
              />
            ) : undefined
          }
          fullWidth
          inputRef={inputRef}
          onChange={handleChange}
          placeholder="Type in keywords..."
          value={searchTerm}
        />
        <ButtonPrimary type="submit">Search</ButtonPrimary>
      </SearchForm>
    </SearchDialog>
  );
}
