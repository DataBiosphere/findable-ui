import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useSearchParams } from "next/navigation";
import Router from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { isValidUrl } from "../../../../../../../../../../../../common/utils";
import { ButtonPrimary } from "../../../../../../../../../../../common/Button/components/ButtonPrimary/buttonPrimary";
import { SearchIcon } from "../../../../../../../../../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { isClientSideNavigation } from "../../../../../../../../../../../Links/common/utils";
import { getSearchParams } from "./common/utils";
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
  const searchParams = useSearchParams();
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
  const handleSubmit = useCallback(
    (
      formEvent: FormEvent<HTMLFormElement>,
      searchStr: string,
      url?: string
    ): void => {
      formEvent.preventDefault();
      if (searchStr && url) {
        closeMenu();
        closeSearch();
        if (isClientSideNavigation(url)) {
          Router.push({
            pathname: url,
            search: getSearchParams(searchParams, searchStr).toString(),
          });
          return;
        }
        if (isValidUrl(url)) {
          // Build search URL and redirect to it.
          const location = new URL(url);
          location.search = getSearchParams(searchParams, searchStr).toString();
          window.location.href = location.href;
        }
        throw new Error("Invalid search URL.");
      }
    },
    [closeMenu, closeSearch, searchParams]
  );

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
