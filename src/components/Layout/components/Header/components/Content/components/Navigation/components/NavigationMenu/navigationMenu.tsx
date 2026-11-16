import { ArrowDropDownRounded } from "@mui/icons-material";
import {
  Grow,
  ClickAwayListener as MClickAwayListener,
  MenuList as MMenuList,
  Paper as MPaper,
  PopperProps as MPopperProps,
} from "@mui/material";
import { ElementType, Fragment, JSX, ReactNode, useEffect } from "react";
import { useMenu } from "../../../../../../../../../common/Menu/hooks/useMenu";
import { NavigationButtonLabel } from "../NavigationButtonLabel/navigationButtonLabel";
import {
  MenuItem,
  NavigationMenuItems,
} from "../NavigationMenuItems/navigationMenuItems";
import { POPPER_PROPS } from "./common/constants";
import { Button, StyledMenuItem, StyledPopper } from "./navigationMenu.styles";
import {
  focusFirstMenuItem,
  getCloseMenuHandler,
  getEnteredHandler,
  getMenuListKeyDownHandler,
  getTriggerProps,
} from "./utils";

/**
 * Props for the NavigationMenu component.
 */
export interface NavLinkMenuProps {
  closeAncestor?: () => void;
  isSelected?: boolean;
  isSubMenu?: boolean;
  menuItems: MenuItem[];
  menuLabel: ReactNode;
  pathname?: string;
  popperProps?: Partial<MPopperProps>;
}

/**
 * Navigation menu for a navigation link with menu items. Renders a nav button that opens a popper menu of the menu items.
 * A top-level menu locks page scroll while open; a submenu renders within a menu item and does not lock scroll.
 * Choosing a menu item closes the menu and the ancestor menu.
 * @param props - Component props.
 * @param props.closeAncestor - Function invoked to close the ancestor menu.
 * @param props.isSelected - Whether the navigation link is selected; defaults to false.
 * @param props.isSubMenu - Whether the menu is nested within another menu; defaults to false.
 * @param props.menuItems - Menu items.
 * @param props.menuLabel - Nav button label.
 * @param props.pathname - Current pathname, used to mark selected menu items.
 * @param props.popperProps - Popper props, each overriding the default popper prop of the same name; anchorEl and open are controlled by the menu and cannot be overridden.
 * @returns The nav button and the navigation menu.
 */
export const NavigationMenu = ({
  closeAncestor,
  isSelected = false,
  isSubMenu = false,
  menuItems,
  menuLabel,
  pathname,
  popperProps,
}: NavLinkMenuProps): JSX.Element => {
  const {
    anchorEl,
    id: menuId,
    onClose,
    onDisableScrollLock,
    onEnableScrollLock,
    onOpen,
    open,
    triggerProps,
  } = useMenu();
  // A submenu's item takes the props that open it, which a Fragment can't.
  const MenuItem: ElementType = isSubMenu ? StyledMenuItem : Fragment;
  const { buttonProps, menuItemProps } = getTriggerProps(
    isSubMenu,
    triggerProps,
    onOpen,
  );

  useEffect(() => {
    return (): void => {
      if (isSubMenu || !open) return;
      onDisableScrollLock();
    };
  }, [isSubMenu, onDisableScrollLock, open]);

  return (
    <MenuItem {...menuItemProps}>
      <Button
        {...buttonProps}
        endIcon={<ArrowDropDownRounded fontSize="small" />}
        isActive={open}
        variant={isSelected ? "activeNav" : "nav"}
      >
        <NavigationButtonLabel label={menuLabel} />
      </Button>
      <StyledPopper
        {...POPPER_PROPS}
        {...popperProps}
        anchorEl={anchorEl}
        open={open}
      >
        {({ TransitionProps }): JSX.Element => (
          <Grow
            {...TransitionProps}
            onEntered={getEnteredHandler(isSubMenu, onEnableScrollLock)}
            onEntering={focusFirstMenuItem}
          >
            <MPaper variant="menu">
              <MClickAwayListener onClickAway={onClose}>
                {/* The id sits on the list, which carries role="menu"; the
                    Popper root is a role="tooltip" wrapper. */}
                <MMenuList
                  component="div"
                  id={menuId}
                  onKeyDown={getMenuListKeyDownHandler(
                    isSubMenu,
                    anchorEl,
                    onClose,
                  )}
                >
                  <NavigationMenuItems
                    closeMenu={getCloseMenuHandler(
                      isSubMenu,
                      anchorEl,
                      onClose,
                      closeAncestor,
                    )}
                    menuItems={menuItems}
                    pathname={pathname}
                  />
                </MMenuList>
              </MClickAwayListener>
            </MPaper>
          </Grow>
        )}
      </StyledPopper>
    </MenuItem>
  );
};
