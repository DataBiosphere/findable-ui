import { Dialog as MDialog, DialogProps as MDialogProps } from "@mui/material";
import { JSX, ReactNode } from "react";

/**
 * Props for the Dialog component.
 */
export interface DialogProps extends MDialogProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Renders the Mui dialog with the given content.
 * @param props - Component props.
 * @param props.children - Dialog content.
 * @param props.className - Class name applied to the dialog.
 * @param props.onClose - Function invoked when the dialog requests to close.
 * @param props.open - Whether the dialog is open.
 * @returns The dialog.
 */
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
