import { Breakpoint } from "@mui/material";
import { UseBreakpoint } from "../../../../../hooks/useBreakpoint";
import { isClientSideNavigation } from "../../../../Links/common/utils";
import { NavLinkItem } from "../components/Content/components/Navigation/navigation";
import {
  Navigation,
  SELECTED_MATCH,
  SelectedMatch,
  SocialMedia,
} from "./entities";

/**
 * Adds to the set of selected patterns, for the navigation link, at the current breakpoint.
 * @param setOfPatterns - Set of selected patterns.
 * @param navLinkItem - Navigation link.
 * @param breakpoint - Breakpoint.
 */
function addSelectedPattern(
  setOfPatterns: Set<string>,
  navLinkItem: NavLinkItem,
  breakpoint?: Breakpoint,
): void {
  if (!navLinkItem.url) return;
  // Exclude external links.
  if (!isClientSideNavigation(navLinkItem.url)) return;
  // Get the configured selected match for the current breakpoint.
  const selectedMatch = getSelectedMatch(navLinkItem.selectedMatch, breakpoint);
  if (!selectedMatch) return;
  // Add the selected pattern for the navigation link.
  if (selectedMatch === SELECTED_MATCH.EQUALS) {
    setOfPatterns.add(getPatternEquals(navLinkItem.url));
    return;
  }
  setOfPatterns.add(getPatternStartsWith(navLinkItem.url));
}

/**
 * Returns the configured menu navigation links.
 * @param navigation - Navigation links.
 * @returns navigation links.
 */
export function getMenuNavigationLinks(navigation?: Navigation): NavLinkItem[] {
  if (!navigation) return [];
  return navigation.reduce((acc: NavLinkItem[], navLinkItems) => {
    if (!navLinkItems) return acc;
    acc.push(...navLinkItems);
    return acc;
  }, []);
}

/**
 * Returns configured navigation links, for the current breakpoint.
 * @param navigationLinks - Navigation links.
 * @param breakpoint - Current breakpoint.
 * @returns navigation links.
 */
export function getNavigationLinks(
  navigationLinks?: NavLinkItem[],
  breakpoint?: Breakpoint,
): NavLinkItem[] {
  if (!navigationLinks) return [];
  return navigationLinks
    .map((navigationLink) => mapSelectedMatches(navigationLink, breakpoint))
    .reduce((acc: NavLinkItem[], navLinkItem: NavLinkItem) => {
      const processedNavLink = processNavLinkItem(navLinkItem, breakpoint);
      if (processedNavLink) {
        acc.push(...processedNavLink);
      }
      return acc;
    }, []);
}

/**
 * Returns the pattern for an exact match, for the given URL e.g. "^/about$".
 * @param url - URL.
 * @returns pattern for an exact match.
 */
function getPatternEquals(url: string): string {
  return `^${url}$`;
}

/**
 * Returns the pattern for a match that starts with the given URL e.g. "^/about".
 * @param url - URL.
 * @returns pattern for a match that starts with the given URL.
 */
function getPatternStartsWith(url: string): string {
  return `^${url}`;
}

/**
 * Returns the configured selected match.
 * @param selectedMatch - Selected match.
 * @param breakpoint - Breakpoint.
 * @returns selected match.
 */
function getSelectedMatch(
  selectedMatch?: SelectedMatch,
  breakpoint?: Breakpoint,
): SELECTED_MATCH | undefined {
  if (!selectedMatch) return SELECTED_MATCH.STARTS_WITH;
  if (typeof selectedMatch === "string") return selectedMatch;
  if (!breakpoint) return;
  return getSelectMatchValue(selectedMatch[breakpoint]);
}

/**
 * Returns the selected match value, for the current breakpoint.
 * @param selectedMatchValue - Selected match value.
 * @returns selected match.
 */
function getSelectMatchValue(
  selectedMatchValue?: boolean | SELECTED_MATCH,
): SELECTED_MATCH | undefined {
  if (selectedMatchValue === false) return undefined;
  if (selectedMatchValue === true) return SELECTED_MATCH.STARTS_WITH;
  return selectedMatchValue || SELECTED_MATCH.STARTS_WITH;
}

/**
 * Returns true if the link is flattened at the current breakpoint.
 * @param navLinkItem - Navigation link.
 * @param breakpoint - Current breakpoint.
 * @returns true if the link is flattened.
 */
function isLinkFlattened(
  navLinkItem: NavLinkItem,
  breakpoint?: Breakpoint,
): boolean {
  if (!breakpoint) return false; // Default is not flattened.
  if (!navLinkItem.flatten) return false; // Default is not flattened.
  return navLinkItem.flatten[breakpoint] === true;
}

/**
 * Returns true if the link is visible at the current breakpoint.
 * @param navLinkItem - Navigation link.
 * @param breakpoint - Current breakpoint.
 * @returns true if the link is visible.
 */
function isLinkVisible(
  navLinkItem: NavLinkItem,
  breakpoint?: Breakpoint,
): boolean {
  if (!breakpoint) return true; // Default is visible.
  if (!navLinkItem.visible) return true; // Default is visible.
  return navLinkItem.visible[breakpoint] !== false;
}

/**
 * Returns true if the social media is visible at the current breakpoint.
 * @param bp - Breakpoint.
 * @param socialMedia - Social media.
 * @returns true.
 */
export function isSocialsVisible(
  bp: Pick<UseBreakpoint, "breakpoint" | "lgUp">,
  socialMedia?: SocialMedia,
): boolean {
  if (!socialMedia) return false;
  if (!bp.breakpoint) return false;
  if (!socialMedia.visible) return bp.lgUp;
  return socialMedia.visible[bp.breakpoint] !== false;
}

/**
 * Returns the navigation link with the selected matches, for the current breakpoint.
 * @param navLinkItem - Navigation link.
 * @param breakpoint - Breakpoint.
 * @returns navigation link with the selected matches.
 */
function mapSelectedMatches(
  navLinkItem: NavLinkItem,
  breakpoint?: Breakpoint,
): NavLinkItem {
  const setOfPatterns = new Set<string>();
  // Add selected pattern for the current navigation link.
  addSelectedPattern(setOfPatterns, navLinkItem, breakpoint);
  const cloneLink = { ...navLinkItem };
  if (cloneLink.menuItems) {
    cloneLink.menuItems = [...cloneLink.menuItems].map((menuItem) =>
      mapSelectedMatches(menuItem, breakpoint),
    );
    for (const { selectedPatterns = [] } of cloneLink.menuItems) {
      selectedPatterns.forEach((pattern) => setOfPatterns.add(pattern));
    }
  }
  cloneLink.selectedPatterns = [...setOfPatterns];
  return cloneLink;
}

/**
 * Returns the processed navigation link item.
 * Flattens menu items, and removes items that are not visible for the current breakpoint.
 * @param navLinkItem - Navigation link.
 * @param breakpoint - Current breakpoint.
 * @returns processed navigation link item.
 */
function processNavLinkItem(
  navLinkItem: NavLinkItem,
  breakpoint?: Breakpoint,
): NavLinkItem[] | undefined {
  if (isLinkVisible(navLinkItem, breakpoint)) {
    const cloneLink = { ...navLinkItem };
    // Recursively process menu items.
    if (cloneLink.menuItems) {
      const menuItems = getNavigationLinks(navLinkItem.menuItems, breakpoint);
      // Remove menu items if empty.
      if (menuItems.length === 0) {
        delete cloneLink.menuItems;
      } else {
        // Flatten the menu items if the navigation is flattened.
        if (isLinkFlattened(cloneLink, breakpoint)) {
          return menuItems;
        } else {
          cloneLink.menuItems = menuItems;
        }
      }
    }
    return [cloneLink];
  }
}
