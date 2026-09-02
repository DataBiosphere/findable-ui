import styled from "@emotion/styled";

/* Generates no box, so the trigger stays a flex item of the header actions and
   the toolbar — not this element — remains the search bar's containing block.
   It exists only to give ClickAwayListener a single node covering both. */
export const StyledContainer = styled("span")`
  display: contents;
`;
