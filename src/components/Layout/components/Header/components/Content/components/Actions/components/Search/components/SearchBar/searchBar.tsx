import { ClickAwayListener, Fade } from "@mui/material";
import { JSX } from "react";
import { SELECTOR } from "../../../../../../../../../../../../common/selectors";
import Form from "./components/Form/form";
import { StyledPaper } from "./searchBar.styles";
import type { SearchBarProps } from "./types";

/**
 * Renders the header search bar, anchored beneath the header toolbar.
 * @param props - Component props.
 * @param props.onClose - Closes the search bar.
 * @param props.onSubmit - Submits the search term.
 * @param props.open - Whether the search bar is open.
 * @returns The header search bar.
 */
export default function SearchBar({
  onClose,
  onSubmit,
  open,
}: SearchBarProps): JSX.Element {
  return (
    <Fade in={open} unmountOnExit>
      <StyledPaper elevation={0} id={SELECTOR.SEARCH_BAR}>
        <ClickAwayListener onClickAway={onClose}>
          <Form onSubmit={onSubmit} />
        </ClickAwayListener>
      </StyledPaper>
    </Fade>
  );
}
