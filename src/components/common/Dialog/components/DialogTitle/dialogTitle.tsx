import { CloseRounded } from "@mui/icons-material";
import { IconButton, DialogTitle as MDialogTitle } from "@mui/material";
import { JSX, ReactNode } from "react";
import { ARIA_LABEL } from "./constants";

export interface DialogTitleProps {
  className?: string;
  closeLabel?: string; // Accessible name for the close button. Defaults to "Close"; override for a more specific name e.g. "Close publish atlas dialog".
  onClose?: () => void;
  title?: ReactNode;
}

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
