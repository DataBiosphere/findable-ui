import { CloseRounded } from "@mui/icons-material";
import { Drawer, PaperProps } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { DESKTOP } from "../../../../theme/common/breakpoints";
import { CloseDrawerIconButton } from "../../../common/IconButton/iconButton.styles";
import {
  Sidebar as PermanentSidebar,
  SidebarPositioner,
} from "./sidebar.styles";

export interface SidebarProps {
  children: ReactNode | ReactNode[];
  drawerOpen?: boolean;
  Label?: ReactNode;
  onDrawerClose?: () => void;
}

export const Sidebar = ({
  children,
  drawerOpen,
  Label,
  onDrawerClose,
}: SidebarProps): JSX.Element => {
  const tablet = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, DESKTOP);
  const controlledSidebar = typeof drawerOpen === "boolean";
  const drawerSidebar = controlledSidebar && tablet; // Sidebar is "temporary" drawer when drawerOpen is defined and breakpoint is "tablet" or smaller.
  const Bar = drawerSidebar ? Drawer : PermanentSidebar;
  const barProps = drawerSidebar
    ? {
        PaperProps: {
          elevation: 0,
          variant: "sidebar" as PaperProps["variant"],
        },
        onClose: onDrawerClose,
        open: drawerOpen,
      }
    : {};

  // Closes an open, controlled drawer sidebar with a change of breakpoint to "desktop".
  useEffect(() => {
    if (drawerOpen && !tablet) {
      onDrawerClose && onDrawerClose();
    }
  }, [drawerOpen, tablet, onDrawerClose]);

  return (
    <Bar {...barProps}>
      <SidebarPositioner>
        {drawerOpen && tablet && (
          <CloseDrawerIconButton
            Icon={CloseRounded}
            onClick={onDrawerClose}
            size="medium" // overrides size specification of IconButton component via destructured props
          />
        )}
        {Label}
        {children}
      </SidebarPositioner>
    </Bar>
  );
};
