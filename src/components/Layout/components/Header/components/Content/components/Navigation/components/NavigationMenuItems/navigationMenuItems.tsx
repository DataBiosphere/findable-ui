import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem as MMenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { Fragment, ReactNode } from "react";
import {
  TEXT_BODY_400,
  TEXT_BODY_500,
  TEXT_BODY_SMALL_400_2_LINES,
  TEXT_UPPERCASE_500,
} from "../../../../../../../../../../theme/common/typography";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../../../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../../../../../../Links/common/utils";
import { isNavigationLinkSelected } from "../../common/utils";
import { NavLinkItem } from "../../navigation";
import { MENU_ANCHOR_ORIGIN_RIGHT_TOP } from "../NavigationMenu/common/constants";
import { NavigationMenu } from "../NavigationMenu/navigationMenu";

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
  const router = useRouter();
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
            selectedMatch,
            target = ANCHOR_TARGET.SELF,
            url,
          },
          i
        ) =>
          nestedMenuItems ? (
            <NavigationMenu
              key={i}
              anchorOrigin={MENU_ANCHOR_ORIGIN_RIGHT_TOP}
              closeAncestor={closeMenu}
              disablePortal
              menuItems={nestedMenuItems}
              menuLabel={label}
              pathname={pathname}
            />
          ) : (
            <Fragment key={i}>
              <MMenuItem
                disabled={!url}
                onClick={(): void => {
                  closeMenu();
                  isClientSideNavigation(url)
                    ? router.push(url)
                    : window.open(
                        url,
                        target,
                        REL_ATTRIBUTE.NO_OPENER_NO_REFERRER
                      );
                }}
                selected={isNavigationLinkSelected(
                  url,
                  pathname,
                  selectedMatch
                )}
              >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    variant: url
                      ? description
                        ? TEXT_BODY_500
                        : TEXT_BODY_400
                      : TEXT_UPPERCASE_500,
                  }}
                  secondary={description}
                  secondaryTypographyProps={{
                    variant: TEXT_BODY_SMALL_400_2_LINES,
                  }}
                />
              </MMenuItem>
              {divider && <Divider />}
            </Fragment>
          )
      )}
    </>
  );
};
