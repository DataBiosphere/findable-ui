/**
 * Props for the useScrollWithPage hook.
 */
export interface UseScrollWithPageProps {
  anchorEl: HTMLElement | null;
  /** Closes the menu. */
  onClose: () => void;
  open: boolean;
}

/**
 * Return type for the useScrollWithPage hook.
 */
export interface UseScrollWithPage {
  /** The menu's anchor: its button, kept after closing so the menu stays anchored while it transitions out. */
  menuAnchorEl: HTMLElement | null;
  /** Menu close handler, closing the menu and returning focus to its button. */
  onClose: () => void;
}
