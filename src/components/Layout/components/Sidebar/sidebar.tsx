import { JSX, useEffect } from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { TEST_IDS } from "../../../../tests/testIds";
import { useDrawer } from "../../../common/Drawer/provider/hook";
import type { ChildrenProps } from "../../../types";
import { SidebarDrawer } from "./components/SidebarDrawer/sidebarDrawer";
import { SidebarPositioner } from "./components/SidebarPositioner/sidebarPositioner";
import { Sidebar as PermanentSidebar } from "./sidebar.styles";

/**
 * Props for the Sidebar component.
 */
export interface SidebarProps extends ChildrenProps {
  /**
   * Accessible name for the sidebar while it renders as a drawer dialog, below
   * the "md" breakpoint. The permanent sidebar is not a dialog and is unnamed.
   */
  label?: string;
}

/**
 * Sidebar. Below the "md" breakpoint it renders as a drawer, controlled by the drawer context; otherwise it renders as a permanent sidebar.
 * An open drawer closes when the breakpoint changes to "md" or above.
 * @param props - Component props.
 * @param props.children - Sidebar content.
 * @param props.label - Accessible name for the drawer dialog.
 * @returns The sidebar.
 */
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
