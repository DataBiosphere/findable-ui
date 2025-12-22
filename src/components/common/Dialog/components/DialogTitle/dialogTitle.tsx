import { CloseRounded } from "@mui/icons-material";
import { IconButton, DialogTitle as MDialogTitle } from "@mui/material";
import { JSX, ReactNode } from "react";

export interface DialogTitleProps {
  className?: string;
  onClose?: () => void;
  title?: ReactNode;
}

export const DialogTitle = ({
  className,
  onClose,
  title,
}: DialogTitleProps): JSX.Element => {
  return (
    <MDialogTitle className={className}>
      {title}
      {onClose && (
        <IconButton color="ink" edge="end" onClick={onClose} size="xsmall">
          <CloseRounded />
        </IconButton>
      )}
    </MDialogTitle>
  );
};
