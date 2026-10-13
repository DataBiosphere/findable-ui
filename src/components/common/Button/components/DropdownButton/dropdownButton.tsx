import { ArrowDropDownRounded } from "@mui/icons-material";
import { JSX } from "react";
import { BUTTON_PROPS } from "../../constants";
import { StyledButton } from "./dropdownButton.styles";
import { DropdownButtonProps } from "./types";

/**
 * Dropdown button, rendering a secondary contained button with a dropdown arrow end icon.
 * @param props - Component props.
 * @param props.children - Button content.
 * @param props.open - Whether the dropdown is open; defaults to false.
 * @returns The dropdown button.
 */
export const DropdownButton = ({
  children,
  open = false,
  ...props /* Mui ButtonProps */
}: DropdownButtonProps): JSX.Element => {
  return (
    <StyledButton
      {...BUTTON_PROPS.SECONDARY_CONTAINED}
      endIcon={<ArrowDropDownRounded />}
      open={open}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
