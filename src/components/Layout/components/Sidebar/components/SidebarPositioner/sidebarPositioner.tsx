import { JSX, ReactNode } from "react";
import { SELECTOR } from "../../../../../../common/selectors";
import { useLayoutDimensions } from "../../../../../../providers/layoutDimensions/hook";
import { SidebarPositioner as Positioner } from "./sidebarPositioner.styles";

/**
 * Props for the SidebarPositioner component.
 */
export interface SidebarPositionerProps {
  children: ReactNode | ReactNode[];
}

/**
 * Positions the sidebar content; from the "md" breakpoint up, it is sticky and offset by the header height.
 * @param props - Component props.
 * @param props.children - Sidebar content.
 * @returns The sidebar positioner.
 */
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
