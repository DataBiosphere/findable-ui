import { JSX } from "react";
import { useDrawer } from "../../../../components/common/Drawer/provider/hook";
import { SidebarPositioner } from "../../../../components/Layout/components/Sidebar/components/SidebarPositioner/sidebarPositioner";
import { TEST_IDS } from "../../../../tests/testIds";
import { useMode } from "../../mode/provider/hook";
import { IconButton } from "./components/IconButton/iconButton";
import { StyledDrawer } from "./drawer.styles";
import { useDrawerTransition } from "./hooks/UseDrawerTransition/hook";
import { DrawerProps } from "./types";
import { DrawerTransitionProvider } from "./provider/provider";

export const Drawer = ({ children }: DrawerProps): JSX.Element => {
  const { value } = useMode();
  const { onClose, open } = useDrawer();
  const { slotProps, variant } = useDrawerTransition();
  return (
    <DrawerTransitionProvider variant={variant}>
      <StyledDrawer
        closeAfterTransition
        data-testid={TEST_IDS.SIDEBAR_DRAWER}
        mode={value}
        onClose={onClose}
        open={open}
        slotProps={slotProps}
        transitionDuration={open ? 250 : 300}
        variant={variant}
      >
        <SidebarPositioner>
          <IconButton variant={variant} />
          {typeof children === "function" ? children({ variant }) : children}
        </SidebarPositioner>
      </StyledDrawer>
    </DrawerTransitionProvider>
  );
};
