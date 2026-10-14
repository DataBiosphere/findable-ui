import { JSX, ReactNode } from "react";

/**
 * Props for the ConditionalComponent component.
 */
export interface ConditionalComponentProps {
  children?: ReactNode | ReactNode[];
  isIn: boolean;
}

/**
 * Basic component to conditionally render children.
 * @param props - Component props.
 * @param props.children - Content to render.
 * @param props.isIn - Whether to render the children.
 * @returns The children, or null when isIn is false.
 */
export const ConditionalComponent = ({
  children,
  isIn,
}: ConditionalComponentProps): JSX.Element | null => {
  return isIn ? <>{children}</> : null;
};
