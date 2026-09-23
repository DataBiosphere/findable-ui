import { CloseRounded } from "@mui/icons-material";
import { PopoverPosition, PopoverProps } from "@mui/material";
import { JSX, ReactNode } from "react";
import { TEST_IDS } from "../../../../../../tests/testIds";
import { DrawerTransition } from "../../../../../Filter/components/Filter/components/DrawerTransition/drawerTransition";
import { ARIA_LABEL } from "./constants";
import { IconButton, TemporarySidebar } from "./sidebarDrawer.styles";

const DEFAULT_POSITION: PopoverPosition = { left: 0, top: 0 };

/**
 * Returns the drawer's slot props, placing the id and the dialog semantics on
 * the paper so the trigger's `aria-controls` resolves to the drawer rather than
 * to its presentational root. `TemporarySidebar` is a MUI `Popover`, which —
 * unlike `Drawer` — gives its paper no role and no name of its own, so both are
 * set here; a trigger declaring `aria-haspopup="dialog"` would otherwise point
 * at an unnamed generic container. The popover is rendered in a MUI `Modal`,
 * which traps focus and hides the rest of the page, so `aria-modal` is accurate.
 * A blank id — the `DrawerContext` default outside a provider — is treated as
 * no id, as `getPopupAriaProps` does, rather than rendered as `id=""`.
 * @param id - DOM id for the drawer surface.
 * @returns Slot props for the drawer.
 */
function getDrawerSlotProps(id?: string): PopoverProps["slotProps"] {
  return {
    paper: {
      "aria-label": ARIA_LABEL.SIDEBAR,
      "aria-modal": true,
      id: id || undefined,
      role: "dialog",
      square: true,
    },
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
