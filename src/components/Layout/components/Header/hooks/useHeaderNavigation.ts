import { useBreakpoint } from "../../../../../hooks/useBreakpoint";
import { getNavigationLinks } from "../common/utils";
import { NavLinkItem } from "../components/Content/components/Navigation/navigation";
import { HeaderProps } from "../header";

export interface UseHeaderNavigation {
  navigation: [NavLinkItem[], NavLinkItem[], NavLinkItem[]];
}

export const useHeaderNavigation = (
  headerProps: HeaderProps
): UseHeaderNavigation => {
  const { breakpoint } = useBreakpoint();
  const { navigation: [navL, navC, navR] = [] } = headerProps;
  const navItemsL = getNavigationLinks(navL, breakpoint);
  const navItemsC = getNavigationLinks(navC, breakpoint);
  const navItemsR = getNavigationLinks(navR, breakpoint);
  return { navigation: [navItemsL, navItemsC, navItemsR] };
};
