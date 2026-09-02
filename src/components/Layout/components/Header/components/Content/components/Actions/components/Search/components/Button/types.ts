import { Ref } from "react";

export interface ButtonProps {
  /** Renders the icon button variant, used once the header collapses to a menu. */
  isMenuIn?: boolean;
  onClick: () => void;
  /** Whether the search bar is open; drives the button's expanded state. */
  open: boolean;
  ref?: Ref<HTMLButtonElement>;
}
