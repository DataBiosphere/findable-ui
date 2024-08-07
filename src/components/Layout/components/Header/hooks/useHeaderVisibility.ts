import { useBreakpoint } from "../../../../../hooks/useBreakpoint";
import { HeaderProps } from "../header";

export interface UseHeaderVisibility {
  isIn: {
    isActionsIn: boolean;
    isCenterGroupIn: boolean;
    isCenterNavigationIn: boolean;
    isLeftGroupIn: boolean;
    isLeftNavigationIn: boolean;
    isRightGroupIn: boolean;
    isRightNavigationIn: boolean;
    isSloganIn: boolean;
    isSocialsIn: boolean;
  };
}

/**
 * Returns header component visibility for header related rendering logic.
 * @param headerProps - Header component props.
 * @returns header component visibility.
 */
export const useHeaderVisibility = (
  headerProps: HeaderProps
): UseHeaderVisibility => {
  const { lgUp, mdUp } = useBreakpoint();
  // Header configuration.
  const {
    actions,
    authenticationEnabled,
    logo,
    navigation: [navItemsL, navItemsC, navItemsR] = [],
    searchEnabled,
    slogan,
    socialMedia,
  } = headerProps;
  // Header content.
  const hasActions = Boolean(actions);
  const hasLogo = Boolean(logo);
  const hasMenu = !mdUp;
  const hasNavItemsC = Boolean(navItemsC);
  const hasNavItemsL = Boolean(navItemsL);
  const hasNavItemsR = Boolean(navItemsR);
  const hasSlogan = Boolean(slogan);
  const hasSocials = Boolean(socialMedia);
  // Determines header content visibility.
  const isActionsIn =
    hasActions || searchEnabled || authenticationEnabled || hasMenu;
  const isNavigationIn = mdUp;
  const isSloganIn = hasSlogan && mdUp;
  const isSocialsIn = hasSocials && lgUp;
  // Determines navigation visibility.
  const isCenterNavigationIn = isNavigationIn && hasNavItemsC;
  const isLeftNavigationIn = isNavigationIn && hasNavItemsL;
  const isRightNavigationIn = isNavigationIn && hasNavItemsR;
  // Determines group visibility.
  const isLeftGroupIn = hasLogo || isSocialsIn || isLeftNavigationIn;
  const isCenterGroupIn = isCenterNavigationIn;
  const isRightGroupIn = isRightNavigationIn || isSocialsIn || isActionsIn;

  return {
    isIn: {
      isActionsIn,
      isCenterGroupIn,
      isCenterNavigationIn,
      isLeftGroupIn,
      isLeftNavigationIn,
      isRightGroupIn,
      isRightNavigationIn,
      isSloganIn,
      isSocialsIn,
    },
  };
};
