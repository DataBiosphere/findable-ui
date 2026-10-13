import { Button, Divider, Link as MLink } from "@mui/material";
import Link from "next/link";
import { CSSProperties, forwardRef, Fragment, JSX, ReactNode } from "react";
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

/**
 * A header navigation link, optionally with menu items.
 */
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

/**
 * Props for the Navigation component.
 */
export interface NavigationProps extends TestIdProps {
  className?: string;
  closeAncestor?: () => void;
  headerProps?: HeaderProps;
  isMenuIn?: boolean;
  links: NavLinkItem[];
  pathname?: string;
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

/**
 * Header navigation. A link with menu items renders as a navigation drawer when the header is collapsed to a menu, and as a navigation menu otherwise; any other link renders as a nav button, disabled when it has no URL.
 * Internal URLs use client-side navigation. Clicking a nav button closes the ancestor menu.
 * @param props - Component props.
 * @param props.className - Class name applied to the navigation.
 * @param props.closeAncestor - Function invoked to close the ancestor menu.
 * @param props.headerProps - Header props, passed to navigation drawers.
 * @param props.isMenuIn - Whether the header is collapsed to a menu; defaults to false.
 * @param props.links - Navigation links.
 * @param props.pathname - Current pathname, used to mark selected links.
 * @param props.style - Style applied to the navigation; required for the Fade transition.
 * @param props.testId - Test id, set as the navigation's data-testid attribute.
 * @param ref - Ref forwarded to the navigation element.
 * @returns The navigation.
 */
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
    ref,
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
            i,
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
                      selectedPatterns,
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
                      selectedPatterns,
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
          },
        )}
      </Links>
    );
  },
);
