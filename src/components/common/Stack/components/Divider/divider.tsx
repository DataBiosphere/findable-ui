import { JSX, ElementType, ReactNode } from "react";
import { Divider as Box } from "./divider.styles";

export interface DividerProps {
  children: ReactNode | ReactNode[];
  component?: ElementType;
}

/**
 * A basic component for rendering any "divider" between rows/columns in a Stack (or Links) component.
 * The default wrapper component is a span and can be changed by passing in the MuiBox component prop.
 * The children may be a ReactNode of any type such as a string or component.
 */

export const Divider = ({
  children,
  component = "span",
  ...props /* Spread props to allow for Mui Box specific prop overrides e.g. "sx" or system props. */
}: DividerProps): JSX.Element => {
  return (
    <Box component={component} {...props}>
      {children}
    </Box>
  );
};
