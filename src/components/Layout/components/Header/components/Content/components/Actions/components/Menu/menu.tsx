import { MenuRounded } from "@mui/icons-material";
import { Fade, IconButton, Dialog as MDialog } from "@mui/material";
import { JSX, CSSProperties, forwardRef, Fragment, useEffect } from "react";
import { getMenuNavigationLinks } from "../../../../../../common/utils";
import { HeaderProps } from "../../../../../../header";
import { AppBar } from "../../../../../../header.styles";
import { Content } from "../../../../content.styles";
import { Slogan } from "../../../Slogan/slogan";
import { DIALOG_PROPS } from "./common/constants";
import { Navigation } from "./components/Content/components/Navigation/navigation.styles";
import { Socials } from "./components/Content/components/Socials/socials.styles";
import { Toolbar } from "./components/Toolbar/toolbar";

export interface MenuProps {
  closeMenu: () => void;
  headerProps: HeaderProps;
  isMenuIn: boolean;
  open: boolean;
  openMenu: () => void;
  pathname?: string;
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

export const Menu = forwardRef<HTMLButtonElement, MenuProps>(
  function HeaderMenu(
    {
      closeMenu,
      headerProps,
      isMenuIn,
      open,
      openMenu,
      pathname,
      style,
    }: MenuProps,
    ref,
  ): JSX.Element | null {
    const { navigation, slogan, socialMedia } = headerProps;

    // Set drawer open state to false on change of media breakpoint from small desktop "md" and up.
    useEffect(() => {
      if (isMenuIn) return;
      closeMenu();
    }, [closeMenu, isMenuIn]);

    if (!isMenuIn) return null;

    return (
      <Fragment>
        <IconButton color="ink" onClick={openMenu} ref={ref} style={style}>
          <MenuRounded />
        </IconButton>
        <MDialog
          {...DIALOG_PROPS}
          onClose={closeMenu}
          open={open}
          TransitionComponent={Fade}
          transitionDuration={isMenuIn ? 600 : 0}
        >
          <AppBar component="div" elevation={0}>
            <Toolbar onClose={closeMenu} {...headerProps} />
          </AppBar>
          <Content>
            {slogan && <Slogan slogan={slogan} />}
            <Navigation
              closeAncestor={closeMenu}
              headerProps={headerProps}
              isMenuIn={isMenuIn}
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
  },
);
