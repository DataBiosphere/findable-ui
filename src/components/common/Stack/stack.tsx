import { Stack as MStack, StackProps as MStackProps } from "@mui/material";
import React, { ReactNode } from "react";

/**
 * An extension of the basic Mui Stack component with available Stack props.
 * Stack gutters may also be achieved between rows/columns by using the gap css property.
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/gap.
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
