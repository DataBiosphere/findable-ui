import { ArrowDropDownRounded } from "@mui/icons-material";
import {
  Grow,
  ClickAwayListener as MClickAwayListener,
  MenuList as MMenuList,
  Paper as MPaper,
  PopperProps as MPopperProps,
} from "@mui/material";
import { Fragment, JSX, ReactNode, useEffect } from "react";
import {
  getPopupAriaProps,
  HAS_POPUP,
} from "../../../../../../../../../../utils/ariaPopup";
import { useMenu } from "../../../../../../../../../common/Menu/hooks/useMenu";
import { NavigationButtonLabel } from "../NavigationButtonLabel/navigationButtonLabel";
import {
  MenuItem,
  NavigationMenuItems,
} from "../NavigationMenuItems/navigationMenuItems";
import { POPPER_PROPS } from "./common/constants";
import { Button, StyledMenuItem, StyledPopper } from "./navigationMenu.styles";

export interface NavLinkMenuProps {
  closeAncestor?: () => void;
  isSelected?: boolean;
  isSubMenu?: boolean;
  menuItems: MenuItem[];
  menuLabel: ReactNode;
  pathname?: string;
  popperProps?: Partial<MPopperProps>;
}

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
  } = useMenu();
  const MenuItem = isSubMenu ? StyledMenuItem : Fragment;

  useEffect(() => {
    return (): void => {
      if (isSubMenu || !open) return;
      onDisableScrollLock();
    };
  }, [isSubMenu, onDisableScrollLock, open]);

  return (
    <MenuItem>
      <Button
        {...getPopupAriaProps({ hasPopup: HAS_POPUP.MENU, id: menuId, open })}
        EndIcon={ArrowDropDownRounded}
        isActive={open}
        onClick={onOpen}
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
            onEntered={(): void => {
              if (isSubMenu) return;
              onEnableScrollLock();
            }}
          >
            <MPaper variant="menu">
              <MClickAwayListener onClickAway={onClose}>
                {/* The id sits on the list, which carries role="menu"; the
                    Popper root is a role="tooltip" wrapper. */}
                <MMenuList component="div" id={menuId}>
                  <NavigationMenuItems
                    closeMenu={(): void => {
                      onClose();
                      closeAncestor?.();
                    }}
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
