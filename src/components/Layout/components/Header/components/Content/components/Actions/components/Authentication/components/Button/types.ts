export interface ButtonProps {
  /** Renders the icon button variant, used once the header collapses to a menu. */
  isMenuIn?: boolean;
  /** Starts the sign-in navigation. */
  onClick: () => void;
  /** Resolved sign-in path, used to highlight the button on that route. */
  signInPath: string;
}
