import { Dialog as MDialog, DialogProps as MDialogProps } from "@mui/material";
import { JSX, ReactNode } from "react";

export interface DialogProps extends MDialogProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export const Dialog = ({
  children,
  className,
  onClose,
  open,
  ...props /* Spread props to allow for Mui Dialog specific prop overrides e.g. "fullWidth". */
}: DialogProps): JSX.Element => {
  return (
    <MDialog className={className} onClose={onClose} open={open} {...props}>
      {children}
    </MDialog>
  );
};
