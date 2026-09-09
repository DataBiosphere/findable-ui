import { CloseRounded } from "@mui/icons-material";
import { IconButton, DialogTitle as MDialogTitle } from "@mui/material";
import { JSX, ReactNode } from "react";
import { ARIA_LABEL } from "./constants";

export interface DialogTitleProps {
  className?: string;
  closeLabel?: string;
  onClose?: () => void;
  title?: ReactNode;
}

/**
 * Renders the dialog title, with a close button when `onClose` is given.
 * @param props - Component props.
 * @param props.className - Class name applied to the title.
 * @param props.closeLabel - Accessible name for the close button; defaults to `ARIA_LABEL.CLOSE`. Override for something more specific e.g. "Close publish atlas dialog".
 * @param props.onClose - Closes the dialog; the close button renders only when given.
 * @param props.title - Title content.
 * @returns The dialog title.
 */
export const DialogTitle = ({
  className,
  closeLabel = ARIA_LABEL.CLOSE,
  onClose,
  title,
}: DialogTitleProps): JSX.Element => {
  return (
    <MDialogTitle className={className}>
      {title}
      {onClose && (
        // The CloseRounded icon is aria-hidden (MUI sets that on every SvgIcon),
        // so the button needs an explicit accessible name.
        <IconButton
          aria-label={closeLabel}
          color="ink"
          edge="end"
          onClick={onClose}
          size="xsmall"
        >
          <CloseRounded />
        </IconButton>
      )}
    </MDialogTitle>
  );
};
