import { Button, Divider } from "@mui/material";
import { useRouter } from "next/router";
import React, { CSSProperties, forwardRef, Fragment, ReactNode } from "react";
import {
  ElementAlignment,
  ELEMENT_ALIGNMENT,
} from "../../../../../../../../common/entities";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../../../../../theme/common/breakpoints";
import { ANCHOR_TARGET } from "../../../../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../../../../Links/common/utils";
import { HeaderProps } from "../../../../header";
import { NavigationDrawer } from "./components/NavigationDrawer/navigationDrawer";
import { NavigationMenu } from "./components/NavigationMenu/navigationMenu";
import { MenuItem } from "./components/NavigationMenuItems/navigationMenuItems";
import { Navigation as Links } from "./navigation.styles";

export interface NavLinkItem {
  divider?: boolean;
  flatten?: boolean;
  label: ReactNode;
  menuItems?: MenuItem[];
  target?: ANCHOR_TARGET;
  url: string;
}

export interface NavigationProps {
  alignment?: ElementAlignment;
  className?: string;
  closeAncestor?: () => void;
  headerProps?: HeaderProps;
  links: NavLinkItem[];
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

export const Navigation = forwardRef<HTMLDivElement, NavigationProps>(
  function Navigation(
    {
      alignment = ELEMENT_ALIGNMENT.LEFT,
      className,
      closeAncestor,
      headerProps,
      links,
      style,
    }: NavigationProps,
    ref
  ): JSX.Element {
    const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
    const router = useRouter();
    return (
      <Links
        ref={ref}
        alignment={alignment}
        className={className}
        style={style}
      >
        {links.map(
          (
            { divider, label, menuItems, target = ANCHOR_TARGET.SELF, url },
            i
          ) =>
            menuItems ? (
              <Fragment key={i}>
                {smDesktop ? (
                  <NavigationMenu
                    closeAncestor={closeAncestor}
                    menuItems={menuItems}
                    menuLabel={label}
                  />
                ) : (
                  <NavigationDrawer
                    closeAncestor={closeAncestor}
                    headerProps={headerProps}
                    menuItems={menuItems}
                    menuLabel={label}
                  />
                )}
                {divider && <Divider />}
              </Fragment>
            ) : (
              <Fragment key={i}>
                <Button
                  onClick={(): void => {
                    isClientSideNavigation(url)
                      ? router.push(url)
                      : window.open(url, target, "noopener noreferrer");
                    closeAncestor?.();
                  }}
                  variant="nav"
                >
                  {label}
                </Button>
                {divider && <Divider />}
              </Fragment>
            )
        )}
      </Links>
    );
  }
);
