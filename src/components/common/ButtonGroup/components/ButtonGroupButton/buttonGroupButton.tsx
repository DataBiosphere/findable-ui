import { Button as MButton } from "@mui/material";
import { JSX, ReactNode } from "react";
import { LoadingIcon } from "../../../CustomIcon/components/LoadingIcon/loadingIcon";

/**
 * Props for the ButtonGroupButton component.
 */
export interface ButtonGroupButtonProps {
  action: string; // Short description to describe button action.
  className?: string;
  disabled?: boolean;
  label: ReactNode; // Button label may be a string or an element e.g. icon.
  loading?: boolean;
  loadingIcon?: ReactNode;
  onClick: () => void; // Function invoked with button onClick handler.
}

/**
 * Button group button, rendering the loading icon in place of the label, and ignoring clicks, while loading.
 * @param props - Component props.
 * @param props.className - Class name applied to the button.
 * @param props.disabled - Whether the button is disabled; defaults to false.
 * @param props.label - Button label.
 * @param props.loading - Whether the button is loading.
 * @param props.loadingIcon - Icon shown while loading; defaults to a small loading icon.
 * @param props.onClick - Function invoked when the button is clicked.
 * @returns The button group button.
 */
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
