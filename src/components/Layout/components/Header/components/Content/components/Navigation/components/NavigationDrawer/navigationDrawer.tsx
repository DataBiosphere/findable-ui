import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import React, { ReactNode, useState } from "react";
import { Button } from "../../../../../../../../../common/Button/button";
import { BackArrowIcon } from "../../../../../../../../../common/CustomIcon/components/BackArrowIcon/backArrowIcon";
import { HeaderProps } from "../../../../../../header";
import { AppBar } from "../../../../../../header.styles";
import { DrawerNavigation as Navigation } from "../../../Actions/components/Menu/components/Content/components/Navigation/navigation.styles";
import { Toolbar } from "../../../Actions/components/Menu/components/Toolbar/toolbar";
import { MenuItem } from "../NavigationMenuItems/navigationMenuItems";
import { Slide } from "./components/Slide/slide";
import {
  Button as BackButton,
  Content,
  Dialog,
} from "./navigationDrawer.styles";

export interface NavigationDrawerProps {
  closeAncestor?: () => void;
  headerProps?: HeaderProps;
  menuItems: MenuItem[];
  menuLabel: ReactNode;
  pathname?: string;
}

export const NavigationDrawer = ({
  closeAncestor,
  headerProps,
  menuItems,
  menuLabel,
  pathname,
}: NavigationDrawerProps): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const openDrawer = (): void => {
    setDrawerOpen(true);
  };
  const closeDrawer = (): void => {
    setDrawerOpen(false);
  };
  const closeDrawers = (): void => {
    setDrawerOpen(false);
    closeAncestor?.();
  };
  return (
    <>
      <Button
        EndIcon={ArrowDropDownRoundedIcon}
        onClick={openDrawer}
        variant="nav"
      >
        {menuLabel}
      </Button>
      <Dialog
        disableScrollLock
        fullScreen
        hideBackdrop
        keepMounted={false}
        onClose={closeDrawers}
        open={drawerOpen}
        PaperProps={{ elevation: 0 }}
        TransitionComponent={Slide}
        transitionDuration={300}
      >
        <AppBar component="div" elevation={1}>
          <Toolbar onClose={closeDrawers} {...headerProps} />
        </AppBar>
        <Content>
          <BackButton
            fullWidth
            onClick={closeDrawer}
            StartIcon={BackArrowIcon}
            variant="backNav"
          >
            {menuLabel}
          </BackButton>
          <Navigation
            closeAncestor={closeDrawers}
            headerProps={headerProps}
            links={menuItems}
            pathname={pathname}
          />
        </Content>
      </Dialog>
    </>
  );
};
