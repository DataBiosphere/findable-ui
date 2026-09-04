export interface DisclosureProps {
  closeMenu: () => void;
  /** Renders the icon button variant, used once the header collapses to a menu. */
  isMenuIn?: boolean;
  searchURL?: string;
}
