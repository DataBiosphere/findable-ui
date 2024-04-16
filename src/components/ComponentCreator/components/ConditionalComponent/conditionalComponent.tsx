import React, { ReactNode } from "react";

/**
 * Basic component to conditionally render children.
 */

export interface ConditionalComponentProps {
  children?: ReactNode | ReactNode[];
  isIn: boolean;
}

export const ConditionalComponent = ({
  children,
  isIn,
}: ConditionalComponentProps): JSX.Element | null => {
  return isIn ? <>{children}</> : null;
};
