import styled from "@emotion/styled";
import { IconButton } from "../../../common/IconButton/iconButton";

export const StyledIconButton = styled(IconButton)`
  /* While the request is in flight the button is aria-disabled rather than
   * disabled, so MUI never adds .Mui-disabled or its pointer-events: none.
   * Suppress the pointer affordance here, or the spinner keeps cursor: pointer
   * and the theme's :hover / :active colours while ignoring every click.
   * Scoped to this button rather than IconButton: pointer-events: none on the
   * button would stop a Tooltip attached directly to it from opening. Here the
   * outer span still receives the hover. */
  &[aria-disabled="true"] {
    pointer-events: none;
  }

  /* If the URL disappears mid-request the button is natively disabled while
   * still showing the spinner. Restore the enabled opacity: the theme dims
   * disabled primary icon buttons to 0.5, which compounds with the loading
   * icon's own animated fill-opacity and leaves the spinner close to
   * invisible. */
  &.Mui-disabled[aria-busy="true"] {
    opacity: 1;
  }
`;
