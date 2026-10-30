import type { ClickAwayListenerProps, PopperProps } from "@mui/material";

/**
 * Props for the ClickAway component.
 */
export interface ClickAwayProps {
  /** The panel's trigger; clicks on it are left to the trigger, which toggles the panel. */
  anchorEl: PopperProps["anchorEl"];
  /** The panel, which must hold a ref. */
  children: ClickAwayListenerProps["children"];
  /** When true, the panel is not dismissed by a click away or Escape; e.g. in a modal drawer, whose backdrop dismisses it. */
  disabled?: boolean;
  /** Closes the panel on a click away, and on Escape unless onEscape is given. */
  onClose: () => void;
  /** Closes the panel on Escape, e.g. returning focus to its trigger; defaults to onClose. */
  onEscape?: () => void;
  open: boolean;
}
