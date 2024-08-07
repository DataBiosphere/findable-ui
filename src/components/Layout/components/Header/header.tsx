import { Fade, Toolbar } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { ComponentsConfig } from "../../../../config/entities";
import { useBreakpoint } from "../../../../hooks/useBreakpoint";
import { useMenu } from "../../../../hooks/useMenu";
import {
  APP_BAR_PROPS,
  FADE_TRANSITION_PROPS,
  TOOLBAR_PROPS,
} from "./common/constants";
import { Navigation, SocialMedia } from "./common/entities";
import { getNavigationLinks } from "./common/utils";
import { Announcements } from "./components/Announcements/announcements";
import { Actions } from "./components/Content/components/Actions/actions";
import { Authentication } from "./components/Content/components/Actions/components/Authentication/authentication";
import { Menu } from "./components/Content/components/Actions/components/Menu/menu";
import { Search } from "./components/Content/components/Actions/components/Search/search";
import { Navigation as DXNavigation } from "./components/Content/components/Navigation/navigation";
import { Slogan } from "./components/Content/components/Slogan/slogan";
import { Divider } from "./components/Content/components/Slogan/slogan.styles";
import { Socials } from "./components/Content/components/Socials/socials.styles";
import { AppBar, Center, Left, Right } from "./header.styles";
import { useHeaderVisibility } from "./hooks/useHeaderVisibility";
import { useMeasureHeader } from "./hooks/useMeasureHeader";

export interface HeaderProps {
  actions?: ReactNode;
  announcements?: ComponentsConfig;
  authenticationEnabled?: boolean;
  className?: string;
  logo: ReactNode;
  navigation?: Navigation;
  searchEnabled?: boolean;
  searchURL?: string;
  slogan?: ReactNode;
  socialMedia?: SocialMedia;
}

export const Header = ({ ...headerProps }: HeaderProps): JSX.Element => {
  const { breakpoint } = useBreakpoint();
  const { isIn } = useHeaderVisibility(headerProps);
  const { headerRef } = useMeasureHeader();
  const { onClose, onOpen, open } = useMenu();
  const pathname = usePathname() ?? "";
  const {
    actions,
    announcements,
    authenticationEnabled,
    className,
    logo,
    navigation: [navItemsL, navItemsC, navItemsR] = [],
    searchEnabled,
    searchURL,
    slogan,
    socialMedia,
  } = headerProps;
  const navigationProps = { headerProps, pathname };

  return (
    <AppBar {...APP_BAR_PROPS} ref={headerRef} className={className}>
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
              <DXNavigation
                {...navigationProps}
                links={getNavigationLinks(navItemsL, breakpoint)}
              />
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
                links={getNavigationLinks(navItemsC, breakpoint)}
              />
            )}
          </Center>
        </Fade>
        {/* Right group */}
        <Fade {...FADE_TRANSITION_PROPS} in={isIn.isRightGroupIn}>
          <Right>
            {/* Navigation */}
            {isIn.isRightNavigationIn && (
              <DXNavigation
                {...navigationProps}
                links={getNavigationLinks(navItemsR)}
              />
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
                  searchEnabled={searchEnabled}
                  searchURL={searchURL}
                />
                {/* Authentication */}
                <Authentication
                  authenticationEnabled={authenticationEnabled}
                  closeMenu={onClose}
                />
                {/* Additional actions i.e. call-to-action button */}
                {actions}
                {/* Menu */}
                <Menu
                  {...navigationProps}
                  closeMenu={onClose}
                  open={open}
                  openMenu={onOpen}
                />
              </Actions>
            )}
          </Right>
        </Fade>
      </Toolbar>
    </AppBar>
  );
};
