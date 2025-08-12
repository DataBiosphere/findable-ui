import { ChildrenProps } from "components/types";
import React, { useEffect } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { TEST_IDS } from "../../../../tests/testIds";
import { useDrawer } from "../../../common/Drawer/provider/hook";
import { SidebarDrawer } from "./components/SidebarDrawer/sidebarDrawer";
import { SidebarPositioner } from "./components/SidebarPositioner/sidebarPositioner";
import { Sidebar as PermanentSidebar } from "./sidebar.styles";

export const Sidebar = ({ children }: ChildrenProps): JSX.Element => {
  const { onClose, open } = useDrawer();
  const bpDownMd = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "md");
  const drawerSidebar = bpDownMd;
  const Bar = drawerSidebar ? SidebarDrawer : PermanentSidebar;
  const barProps = drawerSidebar
    ? { onClose, open }
    : { "data-testid": TEST_IDS.SIDEBAR };

  // Closes an open, controlled drawer sidebar with a change of breakpoint.
  useEffect(() => {
    if (open && !bpDownMd) {
      onClose();
    }
  }, [bpDownMd, onClose, open]);

  return (
    <Bar {...barProps}>
      <SidebarPositioner>{children}</SidebarPositioner>
    </Bar>
  );
};
