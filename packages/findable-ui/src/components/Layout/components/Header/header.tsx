import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Box, Divider, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ELEMENT_ALIGNMENT } from "../../../../common/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../theme/common/breakpoints";
import { Social, Socials } from "../../../common/Socials/socials";
import { getHeaderNavigationLinks } from "./common/utils";
import { Content } from "./components/Content/content";
import { Logo, LogoProps } from "./components/Logo/logo";
import {
  NavAlignment,
  NavLinkItem,
  NavLinks,
} from "./components/NavLinks/navLinks";
import { ProfileComponent } from "./components/ProfileComponent/profileComponent";
import { Search } from "./components/Search/search";
import SearchBar from "./components/SearchBar/searchBar";
import { Header as AppBar, HEADER_HEIGHT } from "./header.styles";

export interface HeaderProps {
  authenticationEnabled?: boolean;
  logo: LogoProps;
  navAlignment?: NavAlignment;
  navLinks: NavLinkItem[];
  searchEnabled?: boolean;
  searchURL?: string;
  slogan?: string;
  socials: Social[];
}

export const Header = ({
  authenticationEnabled,
  logo,
  navAlignment = ELEMENT_ALIGNMENT.LEFT,
  navLinks,
  searchEnabled,
  searchURL,
  slogan,
  socials,
}: HeaderProps): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
  const onlySmDesktop = useBreakpointHelper(
    BREAKPOINT_FN_NAME.ONLY,
    DESKTOP_SM
  );

  /**
   * Opens search bar.
   */
  const openSearch = (): void => {
    setSearchOpen(true);
  };

  /**
   * Closes menu.
   */
  const closeMenu = (): void => {
    setDrawerOpen(false);
  };

  /**
   * Closes search bar.
   */
  const closeSearch = (): void => {
    setSearchOpen(false);
  };

  // Set drawer open state to false on change of media breakpoint from mobile to "small desktop".
  useEffect(() => {
    if (smDesktop) {
      setDrawerOpen(false);
    }
  }, [smDesktop]);

  return (
    <AppBar elevation={1} position="fixed">
      <Toolbar sx={{ gap: 4, height: HEADER_HEIGHT }} variant="dense">
        {/* Logo */}
        <Logo {...logo} />
        <Content
          desktopSm={smDesktop}
          drawerOpen={drawerOpen}
          onDrawerClose={closeMenu}
        >
          {/* Slogan divider */}
          {slogan && smDesktop && (
            <Divider orientation="vertical" sx={{ maxHeight: 32 }} />
          )}
          {/* Slogan */}
          {slogan && (
            <Typography
              component="div"
              sx={
                smDesktop
                  ? { fontSize: 12, lineHeight: "18px", maxWidth: 180 }
                  : { px: 6, py: 2 }
              }
              variant={smDesktop ? undefined : "text-body-400"}
            >
              {slogan}
            </Typography>
          )}
          {/* Nav links */}
          <NavLinks
            center={navAlignment === ELEMENT_ALIGNMENT.CENTER}
            links={getHeaderNavigationLinks(navLinks, socials, onlySmDesktop)}
          />
          {/* Socials */}
          {!onlySmDesktop && (
            <Socials
              buttonSize={smDesktop ? "small" : "xlarge"}
              socials={socials}
              sx={{
                gap: smDesktop ? 2 : 4,
                px: smDesktop ? undefined : 4,
                py: smDesktop ? undefined : 2,
              }}
            />
          )}
        </Content>
        {/* Actions */}
        {(searchEnabled || authenticationEnabled || !smDesktop) && (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flex: { md: "none", xs: 1 },
              gap: { md: 2, xs: 3 },
              justifyContent: "flex-end",
            }}
          >
            {/* Search */}
            {searchEnabled && (
              <>
                <Search openSearchFn={openSearch} />
                <SearchBar
                  closeMenuFn={closeMenu}
                  closeSearchFn={closeSearch}
                  modalPosition={HEADER_HEIGHT}
                  searchOpen={searchOpen}
                  searchURL={searchURL}
                />
              </>
            )}
            {/* LoginView */}
            {authenticationEnabled && <ProfileComponent />}
            {/* Menu */}
            {!smDesktop && (
              <IconButton
                aria-label="drawer"
                color="ink"
                onClick={(): void => setDrawerOpen((open) => !open)}
              >
                {drawerOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
              </IconButton>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
