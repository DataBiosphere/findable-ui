import { JSX } from "react";
import { Disclosure } from "./components/Disclosure/disclosure";

export interface SearchProps {
  closeMenu: () => void;
  /** Renders the icon button variant, used once the header collapses to a menu. */
  isMenuIn?: boolean;
  searchEnabled?: boolean;
  searchURL?: string;
}

/**
 * Renders the header search, when enabled.
 * The guard sits here rather than inside the disclosure so that none of its
 * hooks run for consumers that never enable search — notably the
 * `useSearchParams` subscription in `useSubmit`, which would otherwise
 * re-render both Search instances on every URL change.
 * @param props - Component props.
 * @param props.closeMenu - Closes the header menu.
 * @param props.isMenuIn - Renders the icon button variant.
 * @param props.searchEnabled - Whether search is enabled.
 * @param props.searchURL - Configured search path.
 * @returns The header search, or null when search is disabled.
 */
export const Search = ({
  closeMenu,
  isMenuIn,
  searchEnabled,
  searchURL,
}: SearchProps): JSX.Element | null => {
  if (!searchEnabled) return null;

  return (
    <Disclosure
      closeMenu={closeMenu}
      isMenuIn={isMenuIn}
      searchURL={searchURL}
    />
  );
};
