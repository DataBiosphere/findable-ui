import { Button, Divider } from "@mui/material";
import { useRouter } from "next/router";
import React, { CSSProperties, forwardRef, Fragment, ReactNode } from "react";
import { useBreakpoint } from "../../../../../../../../hooks/useBreakpoint";
import { BreakpointKey } from "../../../../../../../../hooks/useBreakpointHelper";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../../../../Links/common/utils";
import { HeaderProps } from "../../../../header";
import { isNavigationLinkSelected } from "./common/utils";
import { NavigationButtonLabel } from "./components/NavigationButtonLabel/navigationButtonLabel";
import { NavigationDrawer } from "./components/NavigationDrawer/navigationDrawer";
import { NavigationMenu } from "./components/NavigationMenu/navigationMenu";
import { MenuItem } from "./components/NavigationMenuItems/navigationMenuItems";
import { Navigation as Links } from "./navigation.styles";

export interface NavLinkItem {
  divider?: boolean;
  flatten?: Partial<Record<BreakpointKey, boolean>>;
  label: ReactNode;
  menuItems?: MenuItem[];
  target?: ANCHOR_TARGET;
  url: string;
  visible?: Partial<Record<BreakpointKey, boolean>>;
}

export interface NavigationProps {
  className?: string;
  closeAncestor?: () => void;
  headerProps?: HeaderProps;
  links: NavLinkItem[];
  pathname?: string;
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

export const Navigation = forwardRef<HTMLDivElement, NavigationProps>(
  function Navigation(
    {
      className,
      closeAncestor,
      headerProps,
      links,
      pathname,
      style,
    }: NavigationProps,
    ref
  ): JSX.Element {
    const { mdUp } = useBreakpoint();
    const router = useRouter();
    return (
      <Links ref={ref} className={className} style={style}>
        {links.map(
          (
            { divider, label, menuItems, target = ANCHOR_TARGET.SELF, url },
            i
          ) =>
            menuItems ? (
              <Fragment key={i}>
                {mdUp ? (
                  <NavigationMenu
                    closeAncestor={closeAncestor}
                    menuItems={menuItems}
                    menuLabel={label}
                    pathname={pathname}
                  />
                ) : (
                  <NavigationDrawer
                    closeAncestor={closeAncestor}
                    headerProps={headerProps}
                    menuItems={menuItems}
                    menuLabel={label}
                    pathname={pathname}
                  />
                )}
                {divider && <Divider />}
              </Fragment>
            ) : (
              <Fragment key={i}>
                <Button
                  disabled={!url}
                  onClick={(): void => {
                    closeAncestor?.();
                    isClientSideNavigation(url)
                      ? router.push(url)
                      : window.open(
                          url,
                          target,
                          REL_ATTRIBUTE.NO_OPENER_NO_REFERRER
                        );
                  }}
                  variant={
                    isNavigationLinkSelected(url, pathname)
                      ? "activeNav"
                      : "nav"
                  }
                >
                  <NavigationButtonLabel label={label} />
                </Button>
                {divider && <Divider />}
              </Fragment>
            )
        )}
      </Links>
    );
  }
);
