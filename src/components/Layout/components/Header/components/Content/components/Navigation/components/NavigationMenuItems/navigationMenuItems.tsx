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
} from "../../../../../../../../../../theme/common/typography";
import { ANCHOR_TARGET } from "../../../../../../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../../../../../../Links/common/utils";
import { NavLinkItem } from "../../navigation";
import { NavigationMenu } from "../NavigationMenu/navigationMenu";

export interface MenuItem extends NavLinkItem {
  description?: string;
  icon?: ReactNode;
}

export interface NavLinkMenuProps {
  closeMenu: () => void;
  menuItems: MenuItem[];
}

export const NavigationMenuItems = ({
  closeMenu,
  menuItems,
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
            target = ANCHOR_TARGET.SELF,
            url,
          },
          i
        ) =>
          nestedMenuItems ? (
            <NavigationMenu
              key={i}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
              closeAncestor={closeMenu}
              menuItems={nestedMenuItems}
              menuLabel={label}
            />
          ) : (
            <Fragment key={i}>
              <MMenuItem
                onClick={(): void => {
                  closeMenu();
                  isClientSideNavigation(url)
                    ? router.push(url)
                    : window.open(url, target, "noopener noreferrer");
                }}
              >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    variant: description ? TEXT_BODY_500 : TEXT_BODY_400,
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
