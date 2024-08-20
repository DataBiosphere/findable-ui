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
  const { breakpoint, lgUp, mdUp, smDown, smUp } = useBreakpoint();
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
  // Breakpoint.
  const hasBreakpoint = Boolean(breakpoint);
  // Header content.
  const hasActions = Boolean(actions);
  const hasLogo = Boolean(logo);
  const hasMenu = smDown;
  const hasNavItemsC = Boolean(navItemsC && navItemsC.length > 0);
  const hasNavItemsL = Boolean(navItemsL && navItemsL.length > 0);
  const hasNavItemsR = Boolean(navItemsR && navItemsR.length > 0);
  const hasSlogan = Boolean(slogan);
  const hasSocials = Boolean(socialMedia);
  // Determines header content visibility.
  const isActionsIn =
    (hasActions || searchEnabled || authenticationEnabled || hasMenu) &&
    hasBreakpoint;
  const isNavigationIn = smUp;
  const isSloganIn = hasSlogan && mdUp;
  const isSocialsIn = hasSocials && lgUp;
  // Determines navigation visibility.
  const isCenterNavigationIn = isNavigationIn && hasNavItemsC;
  const isLeftNavigationIn = isNavigationIn && hasNavItemsL;
  const isRightNavigationIn = isNavigationIn && hasNavItemsR;
  // Determines group visibility.
  const isLeftGroupIn = hasLogo || isSloganIn || isLeftNavigationIn;
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
