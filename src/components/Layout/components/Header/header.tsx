import { Fade, Toolbar } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { ComponentsConfig } from "../../../../config/entities";
import {
  APP_BAR_PROPS,
  FADE_TRANSITION_PROPS,
  TOOLBAR_PROPS,
} from "./common/constants";
import { Navigation, SocialMedia } from "./common/entities";
import { Announcements } from "./components/Announcements/announcements";
import { Actions } from "./components/Content/components/Actions/actions";
import {
  AuthenticationProps,
  Authentication as DefaultAuthentication,
  renderButton as renderAuthenticationButton,
  renderIconButton as renderAuthenticationIconButton,
} from "./components/Content/components/Actions/components/Authentication/authentication";
import { Menu } from "./components/Content/components/Actions/components/Menu/menu";
import {
  renderButton as renderSearchButton,
  renderIconButton as renderSearchIconButton,
  Search,
} from "./components/Content/components/Actions/components/Search/search";
import { Navigation as DXNavigation } from "./components/Content/components/Navigation/navigation";
import { Slogan } from "./components/Content/components/Slogan/slogan";
import { Divider } from "./components/Content/components/Slogan/slogan.styles";
import { Socials } from "./components/Content/components/Socials/socials.styles";
import { AppBar, Center, Left, Right } from "./header.styles";
import { useHeaderNavigation } from "./hooks/useHeaderNavigation";
import { useHeaderVisibility } from "./hooks/useHeaderVisibility";
import { useMeasureHeader } from "./hooks/useMeasureHeader";
import { useMenu } from "./hooks/useMenu";

export interface HeaderProps {
  actions?: ReactNode;
  announcements?: ComponentsConfig;
  authenticationComponent?: React.ComponentType<AuthenticationProps>;
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
  const { navigation } = useHeaderNavigation(headerProps);
  const { isIn } = useHeaderVisibility({ ...headerProps, navigation });
  const { headerRef } = useMeasureHeader();
  const { onClose, onOpen, open } = useMenu();
  const pathname = usePathname() ?? "";
  const {
    actions,
    announcements,
    authenticationEnabled,
    authenticationComponent: Authentication = DefaultAuthentication,
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
              <DXNavigation {...navigationProps} links={navItemsL} />
            )}
          </Left>
        </Fade>
        {/* Center group */}
        <Fade {...FADE_TRANSITION_PROPS} in={isIn.isCenterGroupIn}>
          <Center>
            {/* Center navigation */}
            {isIn.isCenterNavigationIn && (
              <DXNavigation {...navigationProps} links={navItemsC} />
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
                  Button={({ ...props }): JSX.Element =>
                    isIn.isMenuIn
                      ? renderSearchIconButton(props)
                      : renderSearchButton(props)
                  }
                  closeMenu={onClose}
                  searchEnabled={searchEnabled}
                  searchURL={searchURL}
                />
                {/* Authentication */}
                <Authentication
                  Button={({ ...props }): JSX.Element =>
                    isIn.isMenuIn
                      ? renderAuthenticationIconButton(props)
                      : renderAuthenticationButton(props)
                  }
                  authenticationEnabled={authenticationEnabled}
                  closeMenu={onClose}
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
  );
};
