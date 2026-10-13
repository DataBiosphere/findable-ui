import { Drawer as MDrawer, DrawerProps as MDrawerProps } from "@mui/material";
import { JSX, ReactNode } from "react";

/**
 * Props for the Drawer component.
 */
export interface DrawerProps extends MDrawerProps {
  children?: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Renders the Mui drawer with the given content.
 * @param props - Component props.
 * @param props.children - Drawer content.
 * @param props.className - Class name applied to the drawer.
 * @param props.onClose - Function invoked when the drawer requests to close.
 * @param props.open - Whether the drawer is open.
 * @returns The drawer.
 */
export const Drawer = ({
  children,
  className,
  onClose,
  open,
  ...props /* Spread props to allow for Mui Drawer specific prop overrides e.g. "hideBackdrop". */
}: DrawerProps): JSX.Element => {
  return (
    <MDrawer className={className} onClose={onClose} open={open} {...props}>
      {children}
    </MDrawer>
  );
};
