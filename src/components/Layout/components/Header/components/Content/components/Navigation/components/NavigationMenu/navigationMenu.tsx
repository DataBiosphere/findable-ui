import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { MenuProps as MMenuProps } from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import { useBreakpoint } from "../../../../../../../../../../hooks/useBreakpoint";
import { useMenuWithPosition } from "../../../../../../../../../../hooks/useMenuWithPosition";
import { NavigationButtonLabel } from "../NavigationButtonLabel/navigationButtonLabel";
import {
  MenuItem,
  NavigationMenuItems,
} from "../NavigationMenuItems/navigationMenuItems";
import { MENU_ANCHOR_ORIGIN_LEFT_BOTTOM, MENU_PROPS } from "./common/constants";
import { Button, Menu, StyledMenuItem } from "./navigationMenu.styles";

export interface NavLinkMenuProps {
  anchorOrigin?: MMenuProps["anchorOrigin"];
  closeAncestor?: () => void;
  disablePortal?: boolean;
  menuItems: MenuItem[];
  menuLabel: ReactNode;
  pathname?: string;
}

export const NavigationMenu = ({
  anchorOrigin = MENU_ANCHOR_ORIGIN_LEFT_BOTTOM,
  closeAncestor,
  disablePortal,
  menuItems,
  menuLabel,
  pathname,
}: NavLinkMenuProps): JSX.Element => {
  const { mdUp } = useBreakpoint();
  const { anchorEl, onClose, onToggleOpen, open } = useMenuWithPosition();
  const MenuItem = disablePortal ? StyledMenuItem : Fragment;
  const menuItemProps = disablePortal ? { onMouseLeave: onClose } : {};
  return (
    <MenuItem {...menuItemProps}>
      <Button
        EndIcon={ArrowDropDownRoundedIcon}
        isActive={open}
        onClick={onToggleOpen}
        variant="nav"
      >
        <NavigationButtonLabel label={menuLabel} />
      </Button>
      <Menu
        {...MENU_PROPS}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        disablePortal={disablePortal}
        onClose={(): void => {
          onClose();
          closeAncestor?.();
        }}
        open={mdUp && open}
      >
        <NavigationMenuItems
          closeMenu={(): void => {
            onClose();
            closeAncestor?.();
          }}
          menuItems={menuItems}
          pathname={pathname}
        />
      </Menu>
    </MenuItem>
  );
};
