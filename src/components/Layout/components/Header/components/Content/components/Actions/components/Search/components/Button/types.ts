import { Ref } from "react";

export interface ButtonProps {
  /** Renders the icon button variant, used once the header collapses to a menu. */
  isMenuIn?: boolean;
  /** Toggles the search bar; the trigger is a disclosure button. */
  onClick: () => void;
  /** Whether the search bar is open; drives the button's expanded state. */
  open: boolean;
  ref?: Ref<HTMLButtonElement>;
  /** Id of the search bar this button controls. */
  searchBarId: string;
}
