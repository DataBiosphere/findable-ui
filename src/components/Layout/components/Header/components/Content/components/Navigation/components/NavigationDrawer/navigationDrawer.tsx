import { ArrowDropDownRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { JSX, ReactNode, useCallback } from "react";
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

/**
 * Props for the NavigationDrawer component.
 */
export interface NavigationDrawerProps {
  closeAncestor?: () => void;
  headerProps?: HeaderProps;
  isMenuIn: boolean;
  isSelected?: boolean;
  menuItems: MenuItem[];
  menuLabel: ReactNode;
  pathname?: string;
}

/**
 * Navigation drawer for a navigation link with menu items, used in the header menu.
 * Renders a nav button that opens a dialog listing the menu items, with a back button that closes this drawer only.
 * Closing the dialog, or choosing a menu item, also closes the ancestor menu.
 * @param props - Component props.
 * @param props.closeAncestor - Function invoked to close the ancestor menu.
 * @param props.headerProps - Header props, passed to the dialog's toolbar and navigation.
 * @param props.isMenuIn - Whether the header is collapsed to a menu.
 * @param props.isSelected - Whether the navigation link is selected; defaults to false.
 * @param props.menuItems - Menu items.
 * @param props.menuLabel - Label for the nav button and the back button.
 * @param props.pathname - Current pathname, used to mark selected menu items.
 * @returns The nav button and the navigation drawer.
 */
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
        endIcon={<ArrowDropDownRounded fontSize="small" />}
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
            startIcon={<BackArrowIcon fontSize="small" />}
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
