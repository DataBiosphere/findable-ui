import { Stack as MStack, StackProps as MStackProps } from "@mui/material";
import { JSX, ReactNode } from "react";

/**
 * Props for the Stack component.
 */
export interface StackProps {
  alignItems?: MStackProps["alignItems"];
  children: ReactNode | ReactNode[];
  className?: string;
  direction?: MStackProps["direction"];
  divider?: MStackProps["divider"];
  gap?: number;
  justifyContent?: MStackProps["justifyContent"];
  spacing?: number;
}

/**
 * An extension of the basic Mui Stack component with available Stack props.
 * Stack gutters may also be achieved between rows/columns by using the gap css property.
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/gap.
 * @param props - Component props.
 * @param props.alignItems - Cross-axis alignment of the children.
 * @param props.children - Stack content.
 * @param props.className - Class name applied to the stack.
 * @param props.direction - Stack direction; defaults to "column".
 * @param props.divider - Element rendered between each child.
 * @param props.gap - Gap between children; defaults to 0.
 * @param props.justifyContent - Main-axis alignment of the children.
 * @param props.spacing - Spacing between children; defaults to 0.
 * @returns The stack.
 */
export const Stack = ({
  alignItems,
  children,
  className,
  direction = "column",
  divider = undefined,
  gap = 0,
  justifyContent,
  spacing = 0,
}: StackProps): JSX.Element => {
  return (
    <MStack
      className={className}
      direction={direction}
      divider={divider}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      spacing={spacing}
    >
      {children}
    </MStack>
  );
};
