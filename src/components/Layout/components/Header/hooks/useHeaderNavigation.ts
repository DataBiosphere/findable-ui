import { useBreakpoint } from "../../../../../hooks/useBreakpoint";
import { getNavigationLinks } from "../common/utils";
import { NavLinkItem } from "../components/Content/components/Navigation/navigation";
import { HeaderProps } from "../header";

/**
 * Return type for the useHeaderNavigation hook.
 */
export interface UseHeaderNavigation {
  navigation: [NavLinkItem[], NavLinkItem[], NavLinkItem[]];
}

/**
 * Returns the header's left, center and right navigation links for the current breakpoint.
 * @param headerProps - Header props.
 * @returns The left, center and right navigation links.
 */
export const useHeaderNavigation = (
  headerProps: HeaderProps,
): UseHeaderNavigation => {
  const { breakpoint } = useBreakpoint();
  const { navigation: [navL, navC, navR] = [] } = headerProps;
  const navItemsL = getNavigationLinks(navL, breakpoint);
  const navItemsC = getNavigationLinks(navC, breakpoint);
  const navItemsR = getNavigationLinks(navR, breakpoint);
  return { navigation: [navItemsL, navItemsC, navItemsR] };
};
