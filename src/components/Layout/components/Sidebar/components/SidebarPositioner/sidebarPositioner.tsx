import React, { ReactNode } from "react";
import { SELECTOR } from "../../../../../../common/selectors";
import { useLayoutState } from "../../../../../../hooks/useLayoutState";
import { SidebarPositioner as Positioner } from "./sidebarPositioner.styles";

export interface SidebarPositionerProps {
  children: ReactNode | ReactNode[];
}

export const SidebarPositioner = ({
  children,
}: SidebarPositionerProps): JSX.Element => {
  const {
    layoutState: { headerHeight },
  } = useLayoutState();
  return (
    <Positioner headerHeight={headerHeight} id={SELECTOR.SIDEBAR_POSITIONER}>
      {children}
    </Positioner>
  );
};
