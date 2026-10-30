import { ClickAwayListener } from "@mui/material";
import { JSX } from "react";
import { useCloseOnEscape } from "../../../../../../hooks/UseCloseOnEscape/hook";
import type { ClickAwayProps } from "./types";
import { onClickAway } from "./utils";

/**
 * Dismisses a non-modal panel: a mouse press or a tap away from it, or Escape while it is open, closes it; scrolling outside it, by wheel or touch, does not. The click still reaches whatever it lands on, so one click both closes the panel and acts; clicks on the panel's trigger are left to the trigger, which toggles the panel.
 * @param props - Component props.
 * @param props.anchorEl - The panel's trigger.
 * @param props.children - The panel, which must hold a ref.
 * @param props.disabled - When true, renders the panel without dismissal.
 * @param props.onClose - Function to close the panel on a click away, and on Escape unless onEscape is given.
 * @param props.onEscape - Function to close the panel on Escape; defaults to onClose.
 * @param props.open - Whether the panel is open.
 * @returns The panel, dismissed by a click away or Escape.
 */
export const ClickAway = ({
  anchorEl,
  children,
  disabled = false,
  onClose,
  onEscape = onClose,
  open,
}: ClickAwayProps): JSX.Element => {
  useCloseOnEscape({ onClose: onEscape, open: open && !disabled });
  if (disabled) return children;
  return (
    <ClickAwayListener
      // A mouse press, not a click: a drag that starts in the panel and ends
      // outside it does not close it. Touch keeps MUI's default, the end of a
      // tap: a touch that moved (a scroll) does not close it.
      mouseEvent="onMouseDown"
      onClickAway={(event) => onClickAway(event, anchorEl, onClose)}
    >
      {children}
    </ClickAwayListener>
  );
};
