import React, { ElementType } from "react";
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

export interface StatusIconProps {
  priority: Priority;
  StatusIcon: ElementType;
}

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
