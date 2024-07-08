import { Fade, Toolbar } from "@mui/material";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ElementAlignment,
  ELEMENT_ALIGNMENT,
} from "../../../../common/entities";
import { ComponentsConfig } from "../../../../config/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { useLayoutState } from "../../../../hooks/useLayoutState";
import {
  getBorderBoxSizeHeight,
  useResizeObserver,
} from "../../../../hooks/useResizeObserver";
import { LayoutActionKind } from "../../../../providers/layoutState";
import { DESKTOP, DESKTOP_SM } from "../../../../theme/common/breakpoints";
import { FADE_TRANSITION_PROPS } from "./common/constants";
import { SocialMedia } from "./common/entities";
import { getHeaderNavigationLinks } from "./common/utils";
import { Announcements } from "./components/Announcements/announcements";
import { Actions } from "./components/Content/components/Actions/actions";
import { Authentication } from "./components/Content/components/Actions/components/Authentication/authentication";
import { Menu } from "./components/Content/components/Actions/components/Menu/menu";
import { Search } from "./components/Content/components/Actions/components/Search/search";
import {
  Navigation,
  NavLinkItem,
} from "./components/Content/components/Navigation/navigation";
import { Slogan } from "./components/Content/components/Slogan/slogan";
import { Divider } from "./components/Content/components/Slogan/slogan.styles";
import { Socials } from "./components/Content/components/Socials/socials.styles";
import { AppBar as HeaderAppBar, HeaderSmAppBar } from "./header.styles";

export interface HeaderProps {
  actions?: ReactNode;
  announcements?: ComponentsConfig;
  authenticationEnabled?: boolean;
  className?: string;
  logo: ReactNode;
  navAlignment?: ElementAlignment;
  navLinks: NavLinkItem[];
  searchEnabled?: boolean;
  searchURL?: string;
  slogan?: ReactNode;
  socialMedia?: SocialMedia;
}

export const Header = ({ ...headerProps }: HeaderProps): JSX.Element => {
  const {
    announcements,
    authenticationEnabled,
    actions,
    className,
    logo,
    navAlignment = ELEMENT_ALIGNMENT.LEFT,
    navLinks,
    searchEnabled,
    searchURL,
    slogan,
    socialMedia,
  } = headerProps;
  const { layoutDispatch } = useLayoutState();
  const headerRef = useRef<HTMLElement>(null);
  const { height } = useResizeObserver(headerRef, getBorderBoxSizeHeight) || {};
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const onlySmDesktop = useBreakpointHelper(
    BREAKPOINT_FN_NAME.ONLY,
    DESKTOP_SM
  );
  const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
  const desktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP);
  const AppBar =
    navAlignment === ELEMENT_ALIGNMENT.RIGHT ? HeaderSmAppBar : HeaderAppBar;
  const showActions = searchEnabled || authenticationEnabled || !smDesktop;
  const isNavigationIn = smDesktop;
  const isSloganIn = Boolean(slogan) && smDesktop;
  const isSocialsIn = Boolean(socialMedia) && desktop;
  const fadeProps = FADE_TRANSITION_PROPS;

  // Closes header menu.
  const closeMenu = useCallback((): void => {
    setMenuOpen(false);
  }, []);

  // Opens header menu.
  const openMenu = useCallback((): void => {
    setMenuOpen(true);
  }, []);

  // Updates layout state header height.
  useEffect(() => {
    if (!height) return;
    layoutDispatch({
      payload: height,
      type: LayoutActionKind.UpdateHeaderHeight,
    });
  }, [height, layoutDispatch]);

  return (
    <AppBar
      ref={headerRef}
      className={className}
      elevation={1}
      position="fixed"
    >
      {/* Announcements */}
      <Announcements announcements={announcements} />
      {/* Toolbar */}
      <Toolbar variant="dense">
        {/* Logo */}
        {logo}
        {/* Divider */}
        <Fade
          in={isSloganIn}
          style={{ transitionDelay: isSloganIn ? "50ms" : "0ms" }}
          {...fadeProps}
        >
          <Divider orientation="vertical" />
        </Fade>
        {/* Slogan */}
        <Fade
          in={isSloganIn}
          style={{ transitionDelay: isSloganIn ? "50ms" : "0ms" }}
          {...fadeProps}
        >
          <Slogan slogan={slogan} />
        </Fade>
        {/* Navigation */}
        <Fade in={isNavigationIn} {...fadeProps}>
          <Navigation
            alignment={navAlignment}
            headerProps={headerProps}
            links={getHeaderNavigationLinks(
              navLinks,
              socialMedia,
              onlySmDesktop
            )}
          />
        </Fade>
        {/* Socials */}
        {socialMedia && (
          <Fade in={isSocialsIn} {...fadeProps}>
            <Socials buttonSize="small" socials={socialMedia.socials} />
          </Fade>
        )}
        {/* Actions */}
        <Actions showActions={showActions}>
          {/* Search */}
          <Search
            closeMenu={closeMenu}
            searchEnabled={searchEnabled}
            searchURL={searchURL}
          />
          {/* Authentication */}
          <Authentication
            authenticationEnabled={authenticationEnabled}
            closeMenu={closeMenu}
          />
          {/* Additional actions i.e. call-to-action button */}
          {actions}
          {/* Menu */}
          <Menu
            closeMenu={closeMenu}
            headerProps={headerProps}
            open={menuOpen}
            openMenu={openMenu}
          />
        </Actions>
      </Toolbar>
    </AppBar>
  );
};
