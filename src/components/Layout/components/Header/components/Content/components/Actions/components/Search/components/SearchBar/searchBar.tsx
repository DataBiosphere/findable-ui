import { Fade } from "@mui/material";
import { JSX } from "react";
import Form from "./components/Form/form";
import { StyledPaper } from "./searchBar.styles";
import type { SearchBarProps } from "./types";

/**
 * Renders the header search bar, anchored beneath the header toolbar.
 * Dismissal is owned by the Disclosure, which holds the trigger and this bar in
 * a single click-away boundary.
 * @param props - Component props.
 * @param props.id - Element id, targeted by the search button's aria-controls.
 * @param props.onSubmit - Submits the search term.
 * @param props.open - Whether the search bar is open.
 * @returns The header search bar.
 */
export default function SearchBar({
  id,
  onSubmit,
  open,
}: SearchBarProps): JSX.Element {
  return (
    <Fade in={open} unmountOnExit>
      <StyledPaper elevation={0} id={id}>
        <Form onSubmit={onSubmit} />
      </StyledPaper>
    </Fade>
  );
}
