import { CloseRounded } from "@mui/icons-material";
import { PopoverPosition, PopoverProps } from "@mui/material";
import React, { ReactNode } from "react";
import { TEST_IDS } from "../../../../../../tests/testIds";
import { DrawerTransition } from "../../../../../Filter/components/Filter/components/DrawerTransition/drawerTransition";
import { IconButton, TemporarySidebar } from "./sidebarDrawer.styles";

const DEFAULT_POSITION: PopoverPosition = { left: 0, top: 0 };
const DRAWER_SLOT_PROPS: PopoverProps["slotProps"] = {
  paper: { square: true },
  root: { slotProps: { backdrop: { invisible: false } } },
};

export interface SidebarDrawerProps {
  children: ReactNode | ReactNode[];
  onClose?: () => void;
  open?: boolean;
}

export const SidebarDrawer = ({
  children,
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
      slotProps={DRAWER_SLOT_PROPS}
      TransitionComponent={DrawerTransition}
      transitionDuration={open ? 250 : 300}
    >
      <IconButton Icon={CloseRounded} onClick={onClose} size="medium" />
      {children}
    </TemporarySidebar>
  );
};
