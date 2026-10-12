// One name for both states: while open, the popover hides the button from
// assistive tech and traps focus, so a "close" name would never be announced.
// Escape closes the popover.
export const ARIA_LABEL = {
  CONTACT_US: "Contact us",
} as const;
