import { CloseRounded } from "@mui/icons-material";
import { PopoverPosition, PopoverProps } from "@mui/material";
import { JSX, ReactNode } from "react";
import { TEST_IDS } from "../../../../../../tests/testIds";
import { DrawerTransition } from "../../../../../Filter/components/Filter/components/DrawerTransition/drawerTransition";
import { ARIA_LABEL } from "./constants";
import { IconButton, TemporarySidebar } from "./sidebarDrawer.styles";

const DEFAULT_POSITION: PopoverPosition = { left: 0, top: 0 };

/**
 * Returns the drawer's slot props, placing the id on the paper — the element
 * carrying `role="dialog"` — so the trigger's `aria-controls` resolves to the
 * drawer rather than to its presentational root.
 * @param id - DOM id for the drawer surface.
 * @returns Slot props for the drawer.
 */
function getDrawerSlotProps(id?: string): PopoverProps["slotProps"] {
  return {
    paper: { id, square: true },
    root: { slotProps: { backdrop: { invisible: false } } },
  };
}

export interface SidebarDrawerProps {
  children: ReactNode | ReactNode[];
  /** Id of the drawer surface, owned by the `DrawerProvider`. */
  id?: string;
  onClose?: () => void;
  open?: boolean;
}

export const SidebarDrawer = ({
  children,
  id,
  onClose,
  open = false,
}: SidebarDrawerProps): JSX.Element => {
  return (
    <TemporarySidebar
      anchorPosition={DEFAULT_POSITION}
      anchorReference="anchorPosition"
      data-testid={TEST_IDS.SIDEBAR_DRAWER}
      hideBackdrop={false}
      marginThreshold={0}
      onClose={onClose}
      open={open}
      slotProps={getDrawerSlotProps(id)}
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
