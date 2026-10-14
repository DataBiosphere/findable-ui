import { CloseRounded } from "@mui/icons-material";
import { IconButton, DialogTitle as MDialogTitle } from "@mui/material";
import { JSX, ReactNode } from "react";
import { resolveAriaLabel } from "../../../../../utils/ariaLabel";
import { ARIA_LABEL } from "./constants";
import { getTitleAriaLabel } from "./utils";

/**
 * Props for the DialogTitle component.
 */
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
 * @param props.title - Title content. A text title also names the dialog; a title given as an element leaves the close button's label in the dialog's name.
 * @returns The dialog title.
 */
export const DialogTitle = ({
  className,
  closeLabel,
  onClose,
  title,
}: DialogTitleProps): JSX.Element => {
  return (
    // MUI points the dialog's aria-labelledby at this element, so name it from
    // the title alone; otherwise the close button's label joins the name.
    <MDialogTitle aria-label={getTitleAriaLabel(title)} className={className}>
      {title}
      {onClose && (
        // The CloseRounded icon is aria-hidden (MUI sets that on every SvgIcon),
        // so the button needs an explicit accessible name.
        <IconButton
          aria-label={resolveAriaLabel(closeLabel, ARIA_LABEL.CLOSE)}
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
