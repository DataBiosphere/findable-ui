import { CloseRounded } from "@mui/icons-material";
import { IconButton, DialogTitle as MDialogTitle } from "@mui/material";
import { JSX, ReactNode } from "react";
import { getCloseLabel } from "./utils";

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
 * @param props.closeLabel - Accessible name for the close button. Override for something more specific e.g. "Close publish atlas dialog"; a missing or blank value falls back to `ARIA_LABEL.CLOSE`.
 * @param props.onClose - Closes the dialog; the close button renders only when given.
 * @param props.title - Title content.
 * @returns The dialog title.
 */
export const DialogTitle = ({
  className,
  closeLabel,
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
          aria-label={getCloseLabel(closeLabel)}
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
