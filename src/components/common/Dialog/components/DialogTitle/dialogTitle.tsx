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
  titleLabel?: string;
}

/**
 * Renders the dialog title, with a close button when `onClose` is given.
 * @param props - Component props.
 * @param props.className - Class name applied to the title.
 * @param props.closeLabel - Accessible name for the close button. Override for something more specific e.g. "Close publish atlas dialog"; a missing or blank value falls back to `ARIA_LABEL.CLOSE`.
 * @param props.onClose - Closes the dialog; the close button renders only when given.
 * @param props.title - Title content. A text title also names the dialog.
 * @param props.titleLabel - Accessible name for the dialog; set it when the title is not text e.g. an element, otherwise the close button's label joins the dialog's name. It should contain the visible title text. A missing or blank value falls back to a text title.
 * @returns The dialog title.
 */
export const DialogTitle = ({
  className,
  closeLabel,
  onClose,
  title,
  titleLabel,
}: DialogTitleProps): JSX.Element => {
  return (
    // Inside an MUI Dialog, the dialog's aria-labelledby points at this element,
    // so name it from the title alone; otherwise the close button's label joins
    // the dialog's name.
    <MDialogTitle
      aria-label={getTitleAriaLabel(title, titleLabel)}
      className={className}
    >
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
