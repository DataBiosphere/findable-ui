import { ElementType, JSX } from "react";
import { StatusCircle } from "./statusIcon.styles";

/**
 * Model of priority.
 */
export type Priority = keyof typeof PRIORITY;

/**
 * Possible set of priority values.
 */
export enum PRIORITY {
  HIGH = "HIGH",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  NORMAL = "NORMAL",
}

/**
 * Props for the StatusIcon component.
 */
export interface StatusIconProps {
  priority: Priority;
  StatusIcon: ElementType;
}

/**
 * Status icon displayed in a circle styled by priority.
 * @param props - Component props.
 * @param props.priority - Priority, used to style the circle.
 * @param props.StatusIcon - Icon component rendered within the circle.
 * @returns The status icon.
 */
export const StatusIcon = ({
  priority,
  StatusIcon,
}: StatusIconProps): JSX.Element => {
  return (
    <StatusCircle priority={priority}>
      <StatusIcon fontSize="xxlarge" />
    </StatusCircle>
  );
};
