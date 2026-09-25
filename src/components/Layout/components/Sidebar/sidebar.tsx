import { ChildrenProps } from "components/types";
import { JSX, useEffect } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { TEST_IDS } from "../../../../tests/testIds";
import { useDrawer } from "../../../common/Drawer/provider/hook";
import { SidebarDrawer } from "./components/SidebarDrawer/sidebarDrawer";
import { SidebarPositioner } from "./components/SidebarPositioner/sidebarPositioner";
import { Sidebar as PermanentSidebar } from "./sidebar.styles";

export interface SidebarProps extends ChildrenProps {
  /**
   * Accessible name for the sidebar while it renders as a drawer dialog, below
   * the "md" breakpoint. The permanent sidebar is not a dialog and is unnamed.
   */
  label?: string;
}

export const Sidebar = ({ children, label }: SidebarProps): JSX.Element => {
  const { id, onClose, open } = useDrawer();
  const bpDownMd = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "md");
  const drawerSidebar = bpDownMd;
  const Bar = drawerSidebar ? SidebarDrawer : PermanentSidebar;
  const barProps = drawerSidebar
    ? { id, label, onClose, open }
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
