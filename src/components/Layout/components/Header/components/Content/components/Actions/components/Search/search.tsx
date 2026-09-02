import { JSX, useCallback, useRef } from "react";
import { useCloseOnEscape } from "../../../../../../../../../../hooks/UseCloseOnEscape/hook";
import { Button } from "./components/Button/button";
import SearchBar from "./components/SearchBar/searchBar";
import { useSearch } from "./hooks/UseSearch/hook";
import { useSubmit } from "./hooks/UseSubmit/hook";

export interface SearchProps {
  closeMenu: () => void;
  /** Renders the icon button variant, used once the header collapses to a menu. */
  isMenuIn?: boolean;
  searchEnabled?: boolean;
  searchURL?: string;
}

export const Search = ({
  closeMenu,
  isMenuIn,
  searchEnabled,
  searchURL,
}: SearchProps): JSX.Element | null => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { onClose, onOpen, open } = useSearch();
  const { onSubmit } = useSubmit({ closeMenu, onClose, searchURL });

  // Escape is a keyboard dismissal, so focus returns to the button; otherwise
  // it would fall to the body when the bar unmounts. Click-away deliberately
  // does not restore focus, leaving it wherever the user clicked.
  const onCloseWithFocus = useCallback((): void => {
    onClose();
    buttonRef.current?.focus();
  }, [onClose]);

  useCloseOnEscape({ onClose: onCloseWithFocus, open });

  if (!searchEnabled) return null;

  return (
    <>
      <Button
        isMenuIn={isMenuIn}
        onClick={onOpen}
        open={open}
        ref={buttonRef}
      />
      <SearchBar onClose={onClose} onSubmit={onSubmit} open={open} />
    </>
  );
};
