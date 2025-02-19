import { Button, Divider, Link as MLink } from "@mui/material";
import Link from "next/link";
import React, { CSSProperties, forwardRef, Fragment, ReactNode } from "react";
import { BreakpointKey } from "../../../../../../../../hooks/useBreakpointHelper";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../../../../Links/common/utils";
import { TestIdProps } from "../../../../../../../types";
import { SelectedMatch } from "../../../../common/entities";
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
  selectedMatch?: SelectedMatch;
  selectedPatterns?: string[];
  target?: ANCHOR_TARGET;
  url: string;
  visible?: Partial<Record<BreakpointKey, boolean>>;
}

export interface NavigationProps extends TestIdProps {
  className?: string;
  closeAncestor?: () => void;
  headerProps?: HeaderProps;
  isMenuIn?: boolean;
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
      isMenuIn = false,
      links,
      pathname,
      style,
      testId,
    }: NavigationProps,
    ref
  ): JSX.Element {
    return (
      <Links
        ref={ref}
        className={className}
        data-testid={testId}
        isMenuIn={isMenuIn}
        style={style}
      >
        {links.map(
          (
            {
              divider,
              label,
              menuItems,
              selectedPatterns,
              target = ANCHOR_TARGET.SELF,
              url,
            },
            i
          ) => {
            const isClientSide = isClientSideNavigation(url);
            return menuItems ? (
              <Fragment key={i}>
                {isMenuIn ? (
                  <NavigationDrawer
                    closeAncestor={closeAncestor}
                    headerProps={headerProps}
                    isMenuIn={isMenuIn}
                    isSelected={isNavigationLinkSelected(
                      pathname,
                      selectedPatterns
                    )}
                    menuItems={menuItems}
                    menuLabel={label}
                    pathname={pathname}
                  />
                ) : (
                  <NavigationMenu
                    closeAncestor={closeAncestor}
                    isSelected={isNavigationLinkSelected(
                      pathname,
                      selectedPatterns
                    )}
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
                  component={isClientSide ? Link : MLink}
                  disabled={!url}
                  href={url}
                  onClick={(): void => closeAncestor?.()}
                  rel={
                    isClientSide
                      ? REL_ATTRIBUTE.NO_OPENER
                      : REL_ATTRIBUTE.NO_OPENER_NO_REFERRER
                  }
                  target={target}
                  variant={
                    isNavigationLinkSelected(pathname, selectedPatterns)
                      ? "activeNav"
                      : "nav"
                  }
                >
                  <NavigationButtonLabel label={label} />
                </Button>
                {divider && <Divider />}
              </Fragment>
            );
          }
        )}
      </Links>
    );
  }
);
