import { Global } from "@emotion/react";
import { Fade, Toolbar } from "@mui/material";
import { usePathname } from "next/navigation";
import { JSX, ReactNode } from "react";
import { SELECTOR } from "../../../../common/selectors";
import { ComponentsConfig } from "../../../../config/entities";
import { PROPERTY } from "../../../../hooks/useHtmlStyle/constants";
import { useLayoutHeight } from "../../hooks/UseLayoutHeight/hook";
import {
  APP_BAR_PROPS,
  FADE_TRANSITION_PROPS,
  TOOLBAR_PROPS,
} from "./common/constants";
import { Navigation, SocialMedia } from "./common/entities";
import { Announcements } from "./components/Announcements/announcements";
import { Actions } from "./components/Content/components/Actions/actions";
import { Authentication } from "./components/Content/components/Actions/components/Authentication/authentication";
import { Menu } from "./components/Content/components/Actions/components/Menu/menu";
import { Search } from "./components/Content/components/Actions/components/Search/search";
import { NAVIGATION_TEST_ID } from "./components/Content/components/Navigation/constants";
import { Navigation as DXNavigation } from "./components/Content/components/Navigation/navigation";
import { Slogan } from "./components/Content/components/Slogan/slogan";
import { Divider } from "./components/Content/components/Slogan/slogan.styles";
import { Socials } from "./components/Content/components/Socials/socials.styles";
import { AppBar, Center, Left, Right, scrollPadding } from "./header.styles";
import { useHeaderNavigation } from "./hooks/useHeaderNavigation";
import { useHeaderVisibility } from "./hooks/useHeaderVisibility";
import { useMenu } from "./hooks/useMenu";

/**
 * Props for the Header component.
 */
export interface HeaderProps {
  actions?: ReactNode;
  announcements?: ComponentsConfig;
  /**
   * Enables the authentication UI in the header. Pass `true` to enable with
   * the default sign-in path (`/login`), or pass a string to enable AND tell
   * the Sign In button which path to navigate to (e.g. `"/"` when NextAuth's
   * `pages.signIn` is configured to `"/"`). The current `asPath` is appended
   * as a `?callbackUrl=` query param so the user lands back where they were
   * after signing in.
   */
  authenticationEnabled?: boolean | string;
  className?: string;
  logo: ReactNode;
  navigation?: Navigation;
  searchEnabled?: boolean;
  searchURL?: string;
  slogan?: ReactNode;
  socialMedia?: SocialMedia;
}

/**
 * App header, rendering announcements above a toolbar with left, center and right groups.
 * The left group holds the logo, slogan and left navigation; the center group the center navigation; and the right group the right navigation, socials and actions (search, authentication, additional actions and the menu).
 * Which content shows depends on the configured content and the current breakpoint.
 * @param props - Component props.
 * @returns The header.
 */
export const Header = ({ ...headerProps }: HeaderProps): JSX.Element => {
  const { navigation } = useHeaderNavigation(headerProps);
  const { isIn } = useHeaderVisibility({ ...headerProps, navigation });
  const { ref: headerRef } = useLayoutHeight(PROPERTY.HEADER_HEIGHT);
  const { onClose, onOpen, open } = useMenu();
  const pathname = usePathname() ?? "";
  const {
    actions,
    announcements,
    authenticationEnabled,
    className,
    logo,
    searchEnabled,
    searchURL,
    slogan,
    socialMedia,
  } = headerProps;
  const [navItemsL, navItemsC, navItemsR] = navigation;
  const navigationProps = {
    headerProps: { ...headerProps, navigation },
    pathname,
  };

  return (
    <>
      <Global styles={scrollPadding} />
      <AppBar
        {...APP_BAR_PROPS}
        className={className}
        id={SELECTOR.HEADER}
        ref={headerRef}
      >
        {/* Announcements */}
        <Announcements announcements={announcements} />
        {/* Toolbar */}
        <Toolbar {...TOOLBAR_PROPS}>
          {/* Left group */}
          <Fade {...FADE_TRANSITION_PROPS} in={isIn.isLeftGroupIn}>
            <Left>
              {/* Logo */}
              {logo}
              {/* Divider */}
              {isIn.isSloganIn && <Divider flexItem orientation="vertical" />}
              {/* Slogan */}
              {isIn.isSloganIn && <Slogan slogan={slogan} />}
              {/* Left navigation */}
              {isIn.isLeftNavigationIn && (
                <DXNavigation {...navigationProps} links={navItemsL} />
              )}
            </Left>
          </Fade>
          {/* Center group */}
          <Fade {...FADE_TRANSITION_PROPS} in={isIn.isCenterGroupIn}>
            <Center>
              {/* Center navigation */}
              {isIn.isCenterNavigationIn && (
                <DXNavigation
                  {...navigationProps}
                  testId={NAVIGATION_TEST_ID}
                  links={navItemsC}
                />
              )}
            </Center>
          </Fade>
          {/* Right group */}
          <Fade {...FADE_TRANSITION_PROPS} in={isIn.isRightGroupIn}>
            <Right>
              {/* Navigation */}
              {isIn.isRightNavigationIn && (
                <DXNavigation {...navigationProps} links={navItemsR} />
              )}
              {/* Socials */}
              {isIn.isSocialsIn && (
                <Socials
                  buttonSize="small"
                  socials={socialMedia?.socials || []}
                />
              )}
              {/* Actions */}
              {isIn.isActionsIn && (
                <Actions>
                  {/* Search */}
                  <Search
                    closeMenu={onClose}
                    isMenuIn={isIn.isMenuIn}
                    searchEnabled={searchEnabled}
                    searchURL={searchURL}
                  />
                  {/* Authentication */}
                  <Authentication
                    authenticationEnabled={authenticationEnabled}
                    closeMenu={onClose}
                    isMenuIn={isIn.isMenuIn}
                  />
                  {/* Additional actions i.e. call-to-action button */}
                  {actions}
                  {/* Menu */}
                  <Menu
                    {...navigationProps}
                    closeMenu={onClose}
                    isMenuIn={isIn.isMenuIn}
                    open={open}
                    openMenu={onOpen}
                  />
                </Actions>
              )}
            </Right>
          </Fade>
        </Toolbar>
      </AppBar>
    </>
  );
};
