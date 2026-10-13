import { CloseRounded } from "@mui/icons-material";
import { PopoverPosition } from "@mui/material";
import { JSX, ReactNode, useMemo } from "react";
import { TEST_IDS } from "../../../../../../tests/testIds";
import { DrawerTransition } from "../../../../../Filter/components/Filter/components/DrawerTransition/drawerTransition";
import { ARIA_LABEL } from "./constants";
import { IconButton, TemporarySidebar } from "./sidebarDrawer.styles";
import { getDrawerSlotProps } from "./utils";

const DEFAULT_POSITION: PopoverPosition = { left: 0, top: 0 };

/**
 * Props for the SidebarDrawer component.
 */
export interface SidebarDrawerProps {
  children: ReactNode | ReactNode[];
  /** Id of the drawer surface, owned by the `DrawerProvider`. */
  id?: string;
  /**
   * Accessible name for the drawer dialog. Name it for what it holds, so it
   * matches the control that opens it; defaults to "Sidebar".
   */
  label?: string;
  onClose?: () => void;
  open?: boolean;
}

/**
 * Sidebar drawer, rendering the sidebar content in a temporary drawer with a close button.
 * @param props - Component props.
 * @param props.children - Sidebar content.
 * @param props.id - Id of the drawer surface.
 * @param props.label - Accessible name for the drawer dialog; defaults to "Sidebar".
 * @param props.onClose - Function invoked when the drawer closes.
 * @param props.open - Whether the drawer is open; defaults to false.
 * @returns The sidebar drawer.
 */
export const SidebarDrawer = ({
  children,
  id,
  label = ARIA_LABEL.SIDEBAR,
  onClose,
  open = false,
}: SidebarDrawerProps): JSX.Element => {
  const slotProps = useMemo(() => getDrawerSlotProps(id, label), [id, label]);
  return (
    <TemporarySidebar
      anchorPosition={DEFAULT_POSITION}
      anchorReference="anchorPosition"
      data-testid={TEST_IDS.SIDEBAR_DRAWER}
      hideBackdrop={false}
      marginThreshold={0}
      onClose={onClose}
      open={open}
      slotProps={slotProps}
      TransitionComponent={DrawerTransition}
    >
      <IconButton
        aria-label={ARIA_LABEL.CLOSE}
        Icon={CloseRounded}
        onClick={onClose}
        size="medium"
      />
      {children}
    </TemporarySidebar>
  );
};
