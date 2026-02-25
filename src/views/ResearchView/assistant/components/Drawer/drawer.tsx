import { JSX } from "react";
import { TEST_IDS } from "../../../../../tests/testIds";
import { StyledDrawer } from "./drawer.styles";
import { DrawerProps } from "./types";
import { useLayoutSpacing } from "../../../../../hooks/UseLayoutSpacing/hook";
import { DRAWER_PROPS } from "../../../../../styles/common/mui/drawer";

export const Drawer = ({ children }: DrawerProps): JSX.Element => {
  const { spacing } = useLayoutSpacing();
  return (
    <StyledDrawer
      data-testid={TEST_IDS.RESEARCH_PANEL}
      open
      variant={DRAWER_PROPS.VARIANT.PERSISTENT}
      {...spacing}
    >
      {children}
    </StyledDrawer>
  );
};
