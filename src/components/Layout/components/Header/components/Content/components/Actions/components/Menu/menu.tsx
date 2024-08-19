import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Dialog as MDialog, Fade, IconButton } from "@mui/material";
import React, { CSSProperties, forwardRef, Fragment, useEffect } from "react";
import { useBreakpoint } from "../../../../../../../../../../hooks/useBreakpoint";
import { getMenuNavigationLinks } from "../../../../../../common/utils";
import { HeaderProps } from "../../../../../../header";
import { AppBar } from "../../../../../../header.styles";
import { Content } from "../../../../content.styles";
import { Slogan } from "../../../Slogan/slogan";
import { Navigation } from "./components/Content/components/Navigation/navigation.styles";
import { Socials } from "./components/Content/components/Socials/socials.styles";
import { Toolbar } from "./components/Toolbar/toolbar";

export interface MenuProps {
  closeMenu: () => void;
  headerProps: HeaderProps;
  open: boolean;
  openMenu: () => void;
  pathname?: string;
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

export const Menu = forwardRef<HTMLButtonElement, MenuProps>(
  function HeaderMenu(
    { closeMenu, headerProps, open, openMenu, pathname, style }: MenuProps,
    ref
  ): JSX.Element | null {
    const { navigation, slogan, socialMedia } = headerProps;
    const { smDown } = useBreakpoint();

    // Set drawer open state to false on change of media breakpoint from small desktop "md" and up.
    useEffect(() => {
      if (smDown) return;
      closeMenu();
    }, [closeMenu, smDown]);

    if (!smDown) return null;

    return (
      <Fragment>
        <IconButton color="ink" onClick={openMenu} ref={ref} style={style}>
          <MenuRoundedIcon />
        </IconButton>
        <MDialog
          disableScrollLock
          fullScreen
          hideBackdrop
          keepMounted={false}
          onClose={closeMenu}
          open={open}
          PaperProps={{ elevation: 0 }}
          TransitionComponent={Fade}
          transitionDuration={smDown ? 600 : 0}
          TransitionProps={{ easing: "ease-out" }}
        >
          <AppBar component="div" elevation={0}>
            <Toolbar onClose={closeMenu} {...headerProps} />
          </AppBar>
          <Content>
            {slogan && <Slogan slogan={slogan} />}
            <Navigation
              closeAncestor={closeMenu}
              headerProps={headerProps}
              links={getMenuNavigationLinks(navigation)}
              pathname={pathname}
            />
            {socialMedia && (
              <Socials buttonSize="xlarge" socials={socialMedia.socials} />
            )}
          </Content>
        </MDialog>
      </Fragment>
    );
  }
);
