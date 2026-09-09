import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { JSX, ReactNode } from "react";
import { resolveAriaLabel } from "../../../../../utils/ariaLabel";
import { ARIA_LABEL } from "./constants";
import { DrawerTitle as Title } from "./drawerTitle.styles";

export interface DrawerTitleProps {
  className?: string;
  closeLabel?: string;
  onClose?: () => void;
  title?: ReactNode;
}

/**
 * Renders the drawer title, with a close button when `onClose` is given.
 * @param props - Component props.
 * @param props.className - Class name applied to the title.
 * @param props.closeLabel - Accessible name for the close button. Override for something more specific e.g. "Close filters"; a missing or blank value falls back to `ARIA_LABEL.CLOSE`.
 * @param props.onClose - Closes the drawer; the close button renders only when given.
 * @param props.title - Title content.
 * @returns The drawer title.
 */
export const DrawerTitle = ({
  className,
  closeLabel,
  onClose,
  title,
}: DrawerTitleProps): JSX.Element => {
  return (
    <Title className={className}>
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
          <CloseRounded color="inkLight" fontSize="small" />
        </IconButton>
      )}
    </Title>
  );
};
