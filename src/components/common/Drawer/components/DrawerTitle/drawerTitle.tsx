import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { JSX, ReactNode } from "react";
import { DrawerTitle as Title } from "./drawerTitle.styles";

export interface DrawerTitleProps {
  className?: string;
  onClose?: () => void;
  title?: ReactNode;
}

export const DrawerTitle = ({
  className,
  onClose,
  title,
}: DrawerTitleProps): JSX.Element => {
  return (
    <Title className={className}>
      {title}
      {onClose && (
        <IconButton color="ink" edge="end" onClick={onClose} size="xsmall">
          <CloseRounded color="inkLight" fontSize="small" />
        </IconButton>
      )}
    </Title>
  );
};
