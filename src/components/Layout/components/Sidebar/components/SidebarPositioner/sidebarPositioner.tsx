import React, { ReactNode } from "react";
import { SELECTOR } from "../../../../../../common/selectors";
import { useLayoutDimensions } from "../../../../../../providers/layoutDimensions/hook";
import { SidebarPositioner as Positioner } from "./sidebarPositioner.styles";

export interface SidebarPositionerProps {
  children: ReactNode | ReactNode[];
}

export const SidebarPositioner = ({
  children,
}: SidebarPositionerProps): JSX.Element => {
  const { dimensions } = useLayoutDimensions();
  return (
    <Positioner
      headerHeight={dimensions.header.height}
      id={SELECTOR.SIDEBAR_POSITIONER}
    >
      {children}
    </Positioner>
  );
};
