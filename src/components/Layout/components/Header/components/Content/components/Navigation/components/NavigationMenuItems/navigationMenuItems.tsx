import {
  Divider,
  ListItemIcon,
  ListItemText,
  Link as MLink,
  MenuItem as MMenuItem,
} from "@mui/material";
import Link from "next/link";
import React, { Fragment, ReactNode } from "react";
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

export interface MenuItem extends NavLinkItem {
  description?: string;
  icon?: ReactNode;
}

export interface NavLinkMenuProps {
  closeMenu: () => void;
  menuItems: MenuItem[];
  pathname?: string;
}

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
          i
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
                        ? TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_500
                        : TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400
                      : TYPOGRAPHY_PROPS.VARIANT.TEXT_UPPERCASE_500,
                  }}
                  secondary={description}
                  secondaryTypographyProps={{
                    variant:
                      TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_SMALL_400_2_LINES,
                  }}
                />
              </MMenuItem>
              {divider && <Divider />}
            </Fragment>
          );
        }
      )}
    </>
  );
};
