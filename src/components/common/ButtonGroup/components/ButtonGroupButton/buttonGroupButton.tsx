import { Button as MButton } from "@mui/material";
import React, { ReactNode } from "react";
import { LoadingIcon } from "../../../CustomIcon/components/LoadingIcon/loadingIcon";

export interface ButtonGroupButtonProps {
  action: string; // Short description to describe button action.
  className?: string;
  disabled?: boolean;
  label: ReactNode; // Button label may be a string or an element e.g. icon.
  loading?: boolean;
  loadingIcon?: ReactNode;
  onClick: () => void; // Function invoked with button onClick handler.
}

export const ButtonGroupButton = ({
  className,
  disabled = false,
  label,
  loading,
  loadingIcon = <LoadingIcon fontSize="small" />,
  onClick,
}: ButtonGroupButtonProps): JSX.Element => {
  return (
    <MButton
      className={className}
      disabled={disabled}
      onClick={loading ? undefined : onClick}
    >
      {loading ? loadingIcon : label}
    </MButton>
  );
};
