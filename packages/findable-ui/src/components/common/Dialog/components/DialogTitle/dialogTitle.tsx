import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { DialogTitle as MDialogTitle, IconButton } from "@mui/material";
import React, { ReactNode } from "react";

export interface DialogTitleProps {
  onClose?: () => void;
  title?: ReactNode;
}

export const DialogTitle = ({
  onClose,
  title,
}: DialogTitleProps): JSX.Element => {
  return (
    <MDialogTitle>
      {title}
      {onClose && (
        <IconButton color="ink" edge="end" onClick={onClose} size="xsmall">
          <CloseRoundedIcon />
        </IconButton>
      )}
    </MDialogTitle>
  );
};
