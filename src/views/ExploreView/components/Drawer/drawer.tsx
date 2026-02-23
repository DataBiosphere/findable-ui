import { JSX } from "react";
import { TEST_IDS } from "../../../../tests/testIds";
import { useDrawer } from "../../../../components/common/Drawer/provider/hook";
import { SidebarPositioner } from "../../../../components/Layout/components/Sidebar/components/SidebarPositioner/sidebarPositioner";
import { StyledDrawer } from "./drawer.styles";
import { useDrawerTransition } from "./hooks/UseDrawerTransition/hook";
import { useMode } from "../../mode/provider/hook";
import { DrawerProps } from "@mui/material";
import { IconButton } from "./components/IconButton/iconButton";

export const Drawer = ({
  children,
}: Pick<DrawerProps, "children">): JSX.Element => {
  const { value } = useMode();
  const { onClose, open } = useDrawer();
  const { slotProps, variant } = useDrawerTransition();
  return (
    <StyledDrawer
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
        {children}
      </SidebarPositioner>
    </StyledDrawer>
  );
};
