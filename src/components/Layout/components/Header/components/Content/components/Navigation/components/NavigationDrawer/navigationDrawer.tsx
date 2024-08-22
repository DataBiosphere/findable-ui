import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import React, { ReactNode, useCallback } from "react";
import { Button } from "../../../../../../../../../common/Button/button";
import { BackArrowIcon } from "../../../../../../../../../common/CustomIcon/components/BackArrowIcon/backArrowIcon";
import { useDialog } from "../../../../../../../../../common/Dialog/hooks/useDialog";
import { HeaderProps } from "../../../../../../header";
import { AppBar } from "../../../../../../header.styles";
import { DrawerNavigation as Navigation } from "../../../Actions/components/Menu/components/Content/components/Navigation/navigation.styles";
import { Toolbar } from "../../../Actions/components/Menu/components/Toolbar/toolbar";
import { MenuItem } from "../NavigationMenuItems/navigationMenuItems";
import { DIALOG_PROPS } from "./common/constants";
import { Slide } from "./components/Slide/slide";
import {
  Button as BackButton,
  Content,
  Dialog,
} from "./navigationDrawer.styles";

export interface NavigationDrawerProps {
  closeAncestor?: () => void;
  headerProps?: HeaderProps;
  isMenuIn: boolean;
  isSelected?: boolean;
  menuItems: MenuItem[];
  menuLabel: ReactNode;
  pathname?: string;
}

export const NavigationDrawer = ({
  closeAncestor,
  headerProps,
  isMenuIn,
  isSelected = false,
  menuItems,
  menuLabel,
  pathname,
}: NavigationDrawerProps): JSX.Element => {
  const { onClose, onOpen, open } = useDialog();
  const closeDrawers = useCallback((): void => {
    onClose();
    closeAncestor?.();
  }, [closeAncestor, onClose]);
  return (
    <>
      <Button
        EndIcon={ArrowDropDownRoundedIcon}
        onClick={onOpen}
        variant={isSelected ? "activeNav" : "nav"}
      >
        {menuLabel}
      </Button>
      <Dialog
        {...DIALOG_PROPS}
        onClose={closeDrawers}
        open={open}
        TransitionComponent={Slide}
      >
        <AppBar component="div" elevation={1}>
          <Toolbar onClose={closeDrawers} {...headerProps} />
        </AppBar>
        <Content>
          <BackButton
            fullWidth
            onClick={onClose}
            StartIcon={BackArrowIcon}
            variant="backNav"
          >
            {menuLabel}
          </BackButton>
          <Navigation
            closeAncestor={closeDrawers}
            headerProps={headerProps}
            isMenuIn={isMenuIn}
            links={menuItems}
            pathname={pathname}
          />
        </Content>
      </Dialog>
    </>
  );
};
