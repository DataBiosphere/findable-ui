import React, { ReactNode, useEffect } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../theme/common/breakpoints";
import { SidebarDrawer } from "./components/SidebarDrawer/sidebarDrawer";
import { SidebarPositioner } from "./components/SidebarPositioner/sidebarPositioner";
import { Sidebar as PermanentSidebar } from "./sidebar.styles";

export interface SidebarProps {
  children: ReactNode | ReactNode[];
  drawerOpen?: boolean;
  onDrawerClose?: () => void;
}

export const Sidebar = ({
  children,
  drawerOpen,
  onDrawerClose,
}: SidebarProps): JSX.Element => {
  const desktopSmDown = useBreakpointHelper(
    BREAKPOINT_FN_NAME.DOWN,
    DESKTOP_SM
  );
  const controlledSidebar = typeof drawerOpen === "boolean";
  const drawerSidebar = controlledSidebar && desktopSmDown; // Sidebar is "temporary" drawer when drawerOpen is defined and breakpoint is smaller than the breakpoint.
  const Bar = drawerSidebar ? SidebarDrawer : PermanentSidebar;
  const barProps = drawerSidebar ? { drawerOpen, onDrawerClose } : {};

  // Closes an open, controlled drawer sidebar with a change of breakpoint.
  useEffect(() => {
    if (drawerOpen && !desktopSmDown) {
      onDrawerClose?.();
    }
  }, [drawerOpen, onDrawerClose, desktopSmDown]);

  return (
    <Bar {...barProps}>
      <SidebarPositioner>{children}</SidebarPositioner>
    </Bar>
  );
};
