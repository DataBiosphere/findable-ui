import { JSX, ReactNode } from "react";
import { SELECTOR } from "../../../../../../common/selectors";
import { SidebarPositioner as Positioner } from "./sidebarPositioner.styles";

/**
 * Props for the SidebarPositioner component.
 */
export interface SidebarPositionerProps {
  children: ReactNode | ReactNode[];
}

/**
 * Positions the sidebar content; from the "md" breakpoint up, it pins below the sticky header.
 * @param props - Component props.
 * @param props.children - Sidebar content.
 * @returns The sidebar positioner.
 */
export const SidebarPositioner = ({
  children,
}: SidebarPositionerProps): JSX.Element => {
  return <Positioner id={SELECTOR.SIDEBAR_POSITIONER}>{children}</Positioner>;
};
