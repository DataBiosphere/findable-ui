import { Drawer as MDrawer, DrawerProps as MDrawerProps } from "@mui/material";
import React, { ReactNode } from "react";

export interface DrawerProps extends MDrawerProps {
  children?: ReactNode | ReactNode[];
  className?: string;
}

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
