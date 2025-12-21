import { ArrowDropDownRounded } from "@mui/icons-material";
import {
  Grow,
  ClickAwayListener as MClickAwayListener,
  MenuList as MMenuList,
  Paper as MPaper,
  PopperProps as MPopperProps,
} from "@mui/material";
import { JSX, Fragment, ReactNode, useEffect } from "react";
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
                <MMenuList component="div">
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
