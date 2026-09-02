import { ClickAwayListener } from "@mui/material";
import { JSX, useCallback, useId, useRef } from "react";
import { useCloseOnEscape } from "../../../../../../../../../../../../hooks/UseCloseOnEscape/hook";
import { useSearch } from "../../hooks/UseSearch/hook";
import { useSubmit } from "../../hooks/UseSubmit/hook";
import { Button } from "../Button/button";
import SearchBar from "../SearchBar/searchBar";
import { StyledContainer } from "./disclosure.styles";
import { DisclosureProps } from "./types";

/**
 * Renders the search trigger and the bar it controls as a single disclosure.
 * The trigger sits inside the click-away boundary with the bar, so clicking it
 * is handled by the trigger alone rather than racing the dismissal.
 * @param props - Component props.
 * @param props.closeMenu - Closes the header menu.
 * @param props.isMenuIn - Renders the icon button variant.
 * @param props.searchURL - Configured search path.
 * @returns The search disclosure.
 */
export const Disclosure = ({
  closeMenu,
  isMenuIn,
  searchURL,
}: DisclosureProps): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const searchBarId = useId();
  const { onClose, onToggle, open } = useSearch();

  // Escape and submit are both dismissals that leave no obvious focus target —
  // the bar unmounts from under the focused input, and the client-side
  // navigation after submit does not re-seat focus — so both return it to the
  // trigger. Click-away deliberately does not, leaving focus where the user
  // clicked.
  const onCloseWithFocus = useCallback((): void => {
    onClose();
    buttonRef.current?.focus();
  }, [onClose]);

  const { onSubmit } = useSubmit({
    closeMenu,
    onClose: onCloseWithFocus,
    searchURL,
  });

  useCloseOnEscape({ containerRef, onClose: onCloseWithFocus, open });

  return (
    // Bound to `open` so no document listener exists while closed, which is what
    // keeps a click during the fade-out from being cancelled by a stale one.
    <ClickAwayListener
      mouseEvent={open ? "onClick" : false}
      onClickAway={onClose}
      touchEvent={open ? "onTouchEnd" : false}
    >
      <StyledContainer ref={containerRef}>
        <Button
          isMenuIn={isMenuIn}
          onClick={onToggle}
          open={open}
          ref={buttonRef}
          searchBarId={searchBarId}
        />
        <SearchBar id={searchBarId} onSubmit={onSubmit} open={open} />
      </StyledContainer>
    </ClickAwayListener>
  );
};
