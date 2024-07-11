import { Breakpoint } from "@mui/material";
import { NavLinkItem } from "../components/Content/components/Navigation/navigation";
import { Navigation } from "./entities";

/**
 * Returns the configured menu navigation links, for the current breakpoint.
 * @param navigation - Navigation links.
 * @param breakpoint - Current breakpoint.
 * @returns navigation links.
 */
export function getMenuNavigationLinks(
  navigation?: Navigation,
  breakpoint?: Breakpoint
): NavLinkItem[] {
  if (!navigation) return [];
  const navLinkItems = navigation.reduce((acc: NavLinkItem[], navLinkItems) => {
    if (!navLinkItems) return acc;
    acc.push(...navLinkItems);
    return acc;
  }, []);
  return getNavigationLinks(navLinkItems, breakpoint);
}

/**
 * Returns configured navigation links, for the current breakpoint.
 * @param navigationLinks - Navigation links.
 * @param breakpoint - Current breakpoint.
 * @returns navigation links.
 */
export function getNavigationLinks(
  navigationLinks?: NavLinkItem[],
  breakpoint?: Breakpoint
): NavLinkItem[] {
  if (!navigationLinks) return [];
  return navigationLinks.reduce(
    (acc: NavLinkItem[], navLinkItem: NavLinkItem) => {
      const processedNavLink = processNavLinkItem(navLinkItem, breakpoint);
      if (processedNavLink) {
        acc.push(...processedNavLink);
      }
      return acc;
    },
    []
  );
}

/**
 * Returns true if the link is flattened at the current breakpoint.
 * @param navLinkItem - Navigation link.
 * @param breakpoint - Current breakpoint.
 * @returns true if the link is flattened.
 */
function isLinkFlattened(
  navLinkItem: NavLinkItem,
  breakpoint?: Breakpoint
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
  breakpoint?: Breakpoint
): boolean {
  if (!breakpoint) return true; // Default is visible.
  if (!navLinkItem.visible) return true; // Default is visible.
  return navLinkItem.visible[breakpoint] !== false;
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
  breakpoint?: Breakpoint
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
