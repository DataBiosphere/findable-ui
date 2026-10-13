import {
  Divider,
  ListItemIcon,
  ListItemText,
  Link as MLink,
  MenuItem as MMenuItem,
} from "@mui/material";
import Link from "next/link";
import { Fragment, JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../../../styles/common/mui/typography";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../../../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../../../../../../Links/common/utils";
import { isNavigationLinkSelected } from "../../common/utils";
import { NavLinkItem } from "../../navigation";
import { NavigationMenu } from "../NavigationMenu/navigationMenu";
import { POPPER_PROPS } from "./common/constants";

/**
 * A navigation menu item, with an optional description and icon.
 */
export interface MenuItem extends NavLinkItem {
  description?: string;
  icon?: ReactNode;
}

/**
 * Props for the NavigationMenuItems component.
 */
export interface NavLinkMenuProps {
  closeMenu: () => void;
  menuItems: MenuItem[];
  pathname?: string;
}

/**
 * Navigation menu items. A menu item with nested menu items renders as a submenu; any other renders as a link menu item, disabled when it has no URL.
 * Internal URLs use client-side navigation. Choosing a link menu item closes the menu.
 * @param props - Component props.
 * @param props.closeMenu - Function invoked to close the menu.
 * @param props.menuItems - Menu items.
 * @param props.pathname - Current pathname, used to mark selected menu items.
 * @returns The navigation menu items.
 */
export const NavigationMenuItems = ({
  closeMenu,
  menuItems,
  pathname,
}: NavLinkMenuProps): JSX.Element => {
  return (
    <>
      {menuItems.map(
        (
          {
            description,
            divider,
            icon,
            label,
            menuItems: nestedMenuItems,
            selectedPatterns,
            target = ANCHOR_TARGET.SELF,
            url,
          },
          i,
        ) => {
          const isClientSide = isClientSideNavigation(url);
          return nestedMenuItems ? (
            <NavigationMenu
              key={i}
              closeAncestor={closeMenu}
              isSelected={isNavigationLinkSelected(pathname, selectedPatterns)}
              isSubMenu={true}
              menuItems={nestedMenuItems}
              menuLabel={label}
              pathname={pathname}
              popperProps={POPPER_PROPS}
            />
          ) : (
            <Fragment key={i}>
              <MMenuItem
                component={isClientSide ? Link : MLink}
                disabled={!url}
                href={url}
                onClick={(): void => closeMenu()}
                rel={
                  isClientSide
                    ? REL_ATTRIBUTE.NO_OPENER
                    : REL_ATTRIBUTE.NO_OPENER_NO_REFERRER
                }
                selected={isNavigationLinkSelected(pathname, selectedPatterns)}
                target={target}
              >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    variant: url
                      ? description
                        ? TYPOGRAPHY_PROPS.VARIANT.BODY_500
                        : TYPOGRAPHY_PROPS.VARIANT.BODY_400
                      : TYPOGRAPHY_PROPS.VARIANT.UPPERCASE_500,
                  }}
                  secondary={description}
                  secondaryTypographyProps={{
                    variant: TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES,
                  }}
                />
              </MMenuItem>
              {divider && <Divider />}
            </Fragment>
          );
        },
      )}
    </>
  );
};
